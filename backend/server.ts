import { createServer } from 'http';
import next from 'next';
import { initSocket } from './src/lib/socket'; // Remove .ts extension

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  initSocket(server);

  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
