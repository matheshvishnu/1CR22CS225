import { Router } from 'express';
import { createShortUrl, getUrlStatistics, getAllUrls } from './url.controller';

const router = Router();

router.post('/', createShortUrl);
router.get('/', getAllUrls);
router.get('/:shortcode', getUrlStatistics);


export { router as urlRouter };
