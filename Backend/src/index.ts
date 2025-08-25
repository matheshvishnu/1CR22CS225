import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { urlRouter } from './api/url.routes';
import { redirectToLongUrl } from './api/url.controller';
import { log } from './utils/logger';

const app = express();
const PORT = 3001;

// --- FIX IS HERE ---
// We are now specifically allowing only our frontend to talk to this backend.
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/shorturls', urlRouter);
app.get('/:shortcode', redirectToLongUrl);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  log('backend', 'fatal', 'server', `Unhandled error: ${err.message}`);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  log('backend', 'info', 'server', `Server is running on http://localhost:${PORT}`);
});
