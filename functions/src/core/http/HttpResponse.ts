export interface HttpResponse<T> {
  status_code: number;
  payload: T;
}
