import { Request, Response } from 'express';
import { urlStore, UrlData } from '../services/storage.service';
import { generateShortcode } from '../utils/shortcode.util';
import { log } from '../utils/logger';

export const createShortUrl = (req: Request, res: Response) => {
  const { url, validity, shortcode } = req.body;

  if (!url || typeof url !== 'string') {
    log('backend', 'error', 'handler', 'Invalid URL format provided.');
    return res.status(400).json({ message: 'A valid URL must be provided.' });
  }

  let finalShortcode = shortcode;
  if (finalShortcode && urlStore.has(finalShortcode)) {
    log('backend', 'warn', 'service', `Custom shortcode ${shortcode} already exists.`);
    return res.status(409).json({ message: 'This custom shortcode is already in use.' });
  }

  if (!finalShortcode) {
    do {
      finalShortcode = generateShortcode();
    } while (urlStore.has(finalShortcode));
  }

  const validityMinutes = parseInt(validity, 10) || 30;
  const now = new Date();
  const expiryDate = new Date(now.getTime() + validityMinutes * 60000);

  const newUrlData: UrlData = {
    longUrl: url,
    createdAt: now.toISOString(),
    expiresAt: expiryDate.toISOString(),
    clicks: [],
  };

  urlStore.set(finalShortcode, newUrlData);
  log('backend', 'info', 'service', `Short URL created: ${finalShortcode} for ${url}`);

  res.status(201).json({
    shortLink: `http://localhost:3001/${finalShortcode}`,
    expiry: expiryDate.toISOString(),
  });
};

export const redirectToLongUrl = (req: Request, res: Response) => {
  const { shortcode } = req.params;
  const urlData = urlStore.get(shortcode);

  if (!urlData) {
    log('backend', 'warn', 'handler', `Non-existent shortcode accessed: ${shortcode}`);
    return res.status(404).json({ message: 'Short URL not found.' });
  }

  if (new Date() > new Date(urlData.expiresAt)) {
    log('backend', 'warn', 'handler', `Expired shortcode accessed: ${shortcode}`);
    return res.status(410).json({ message: 'This short URL has expired.' });
  }

  urlData.clicks.push({
    timestamp: new Date().toISOString(),
    source: req.headers.referer,
  });
  urlStore.set(shortcode, urlData);

  log('backend', 'info', 'service', `Redirecting ${shortcode} to its original URL.`);
  res.redirect(302, urlData.longUrl);
};

export const getUrlStatistics = (req: Request, res: Response) => {
  const { shortcode } = req.params;
  const urlData = urlStore.get(shortcode);

  if (!urlData) {
    return res.status(404).json({ message: 'Short URL not found.' });
  }
  
  log('backend', 'info', 'controller', `Statistics requested for ${shortcode}.`);
  res.status(200).json({
    originalUrl: urlData.longUrl,
    createdAt: urlData.createdAt,
    expiresAt: urlData.expiresAt,
    totalClicks: urlData.clicks.length,
    clickData: urlData.clicks,
  });
};

export const getAllUrls = (req: Request, res: Response) => {
    // The fix is here: adding the correct types for the map function parameters.
    const allUrls = Array.from(urlStore.entries()).map(([shortcode, data]: [string, UrlData]) => ({
        shortcode,
        ...data
    }));
    log('backend', 'info', 'controller', 'All URL statistics requested.');
    res.status(200).json(allUrls);
};
