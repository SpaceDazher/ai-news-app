import { Server as SocketIOServer } from 'socket.io'; // Renamed to avoid conflict
import { Server as HttpServer } from 'http'; // Import HttpServer type from http module

let io: SocketIOServer | null = null;

export function initSocket(server: HttpServer) { // Changed type from any to HttpServer
  io = new SocketIOServer(server, {
    cors: {
      origin: '*', // Consider restricting this in production
    },
  });
  io.on('connection', (socket) => { // socket type is inferred by socket.io
    console.log('Client connected:', socket.id);
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

export function getIO(): SocketIOServer { // Use renamed type
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
}
