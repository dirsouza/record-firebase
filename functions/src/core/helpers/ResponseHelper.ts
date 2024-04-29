import { HttpError, HttpResponse } from '../http';
import { BusinessError } from '../errors/BusinessError';

export const errorResp = (error: BusinessError): HttpError => ({
  status_code: error.statusCode,
  name: error.name,
  message: error.message
});

export const created = <T>(payload: T): HttpResponse<T> => ({
  status_code: 201,
  payload
});

export const ok = <T>(payload: T): HttpResponse<T> => ({
  status_code: 200,
  payload
});
