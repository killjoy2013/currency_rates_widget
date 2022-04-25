import { Server, Socket } from "socket.io";
import { FAKE_EXCHANGE_CREATED } from "./constants";
import { CreateExchangeType } from "./types";

export class SocketRepository {
  /*
  This static class keeps tracks of the connected sockets to emit websocket messages
  */
  static sockets: Socket[] = [];
  static io: Server;

  public static setIo = (io: Server) => {
    SocketRepository.io = io;
    SocketRepository.io.on("connection", (socket: Socket) => {
      SocketRepository.addSocket(socket);

      socket.on("disconnect", async () => {
        SocketRepository.removeSocket(socket);
      });
    });
  };

  /*
  when a new socket client connects, add it to sockets array
  */
  public static addSocket = (socket: Socket) => {
    SocketRepository.sockets = [...SocketRepository.sockets, socket];
  };

  /*
  when an existing socket disconnects, remove it from sockets array
  */
  public static removeSocket = (socket: Socket) => {
    SocketRepository.sockets = [
      ...SocketRepository.sockets.filter((f) => f.id != socket.id),
    ];
  };

  /*
  emit websocket messages to all existing connected clients
  */
  public static emitMessage = (exchanges: CreateExchangeType[]) => {
    SocketRepository.sockets.forEach((socket) => {
      socket.emit(FAKE_EXCHANGE_CREATED, { exchanges });
    });
  };
}
