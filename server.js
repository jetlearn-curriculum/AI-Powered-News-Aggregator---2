import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

// Serve public/ at root so ./news.json resolves to public/news.json
app.use(express.static(path.join(__dirname, 'public')));

// Serve the root index.html website
app.get(['/', '/index.html'], (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Avoid noisy 404s when no favicon exists in public/
app.get('/favicon.ico', (_req, res) => {
  res.status(204).end();
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
