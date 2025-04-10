import { io, Socket } from 'socket.io-client';
import { AppDispatch } from '@/app/providers/config/store';
import { fetchAnalysisResults } from '../model/analysisResultSlice';

let socket: Socket | null = null;

export function connectAnalysisSocket(dispatch: AppDispatch) {
  if (socket) return;

  socket = io('http://localhost:3001', {
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('Connected to analysis socket');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from analysis socket');
  });

  socket.on('analysis-update', (data) => {
    console.log('Received analysis update:', data);
    dispatch(fetchAnalysisResults());
  });
}

export function disconnectAnalysisSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
