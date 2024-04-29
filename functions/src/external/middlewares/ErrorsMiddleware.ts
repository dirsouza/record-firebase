import { Request, Response, NextFunction } from 'express';
import { BusinessError } from '../../core/errors/BusinessError';
import { BadRequestError, NotFoundError } from '../../core/errors';
import { errorResp } from '../../core/helpers';

export const errorsMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof BusinessError) {
    switch (error.name) {
      case BadRequestError.name:
        res.status(400).json(errorResp(error));
        break;
      case NotFoundError.name:
        res.status(404).json(errorResp(error));
        break;
      default:
        res.status(500).json(errorResp(error));
    }
  } else {
    res.status(500).json(error);
  }
  next(error);
};
