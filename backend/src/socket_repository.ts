import { Server, Socket } from "socket.io";
import { CreateExchangeType } from "./types";

export class SocketRepository {
  static sockets: Socket[] = [];
  static io: Server;

  public static setIo = (io: Server) => {
    SocketRepository.io = io;
    SocketRepository.io.on("connection", (socket: Socket) => {
      let eventDate = new Date();

      console.log(
        `SOCKET CONNECTION socket.id:${socket.id}, transport:${
          socket.handshake.query?.transport
        } on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`
      );
      SocketRepository.addSocket(socket);

      socket.on("disconnect", async () => {
        let eventDate = new Date();
        console.log(
          `SOCKET DISCONNECT socket.id:${socket.id}, transport:${
            socket.handshake.query?.transport
          } on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`
        );
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
      socket.emit("FAKE_EXCHANGE_CREATED", exchanges);
    });
  };
}
