import { AnyZodObject, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../core/errors';

type TypesRequest = 'body' | 'query' | 'params';

interface Options<T> {
  schema: T;
  type: TypesRequest;
}

export const validationMiddleware = <T extends AnyZodObject>(
  options: Options<T>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { schema, type } = options;
      const data = req[type];
      req[type] = await schema.parseAsync(data);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          statusCode: 400,
          name: 'BadRequestError',
          errors: error.flatten().fieldErrors
        });
        return;
      }
      res.status(400).json(new BadRequestError(JSON.stringify(error)));
    }
  };
};
