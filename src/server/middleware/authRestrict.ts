import { Request, Response, NextFunction } from 'express';
const authRestrict = (req: Request, res: Response, next: NextFunction) => {
  // Extract the header.
  const { authorization } = req.headers;

  // Reject if the header is'nt present.
  if (!authorization) {
    res.status(403).json({ message: 'Access denied' });
  }
  next();
};

export = authRestrict;
