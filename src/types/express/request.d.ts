import { Request } from "express";

export type TypedRequestBody<T> = Request<unknown, unknown, T, unknown>;

export type TypedRequestQuery<T> = Request<unknown, unknown, unknown, T>;

export type TypedRequestParams<T> = Request<T, unknown, unknown, unknown>;

export type TypedRequest<
  TParams = unknown,
  TBody = unknown,
  TQuery = unknown,
> = Request<TParams, unknown, TBody, TQuery>;
