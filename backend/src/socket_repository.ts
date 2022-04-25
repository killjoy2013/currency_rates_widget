import { Server, Socket } from "socket.io";
import { FAKE_EXCHANGE_CREATED } from "./constants";
import { CreateExchangeType } from "./types";

export class SocketRepository {
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

  public static addSocket = (socket: Socket) => {
    SocketRepository.sockets = [...SocketRepository.sockets, socket];
  };

  public static removeSocket = (socket: Socket) => {
    SocketRepository.sockets = [
      ...SocketRepository.sockets.filter((f) => f.id != socket.id),
    ];
  };

  public static emitMessage = (exchanges: CreateExchangeType[]) => {
    SocketRepository.sockets.forEach((socket) => {
      socket.emit(FAKE_EXCHANGE_CREATED, { exchanges });
    });
  };
}
