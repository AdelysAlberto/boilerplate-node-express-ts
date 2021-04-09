import { Request, Response } from 'express';
// @ts-ignore
import { logger } from '../../lib';

/**
 * Not found controller.
 * @param {object} req request object.
 * @param {object} res response object.
 */
const notFound = (req: Request, res: Response) => {
  logger.info({ url: req.url, method: req.method, message: `Not found` });
  res.status(404).json({ error: 'Route not found.' });
};

export = notFound;
