import mongoose, { Document, IfAny, Require_id } from "mongoose";

export interface IWrite<T> {
  create(data: T): Promise<T>;
  update(id: string, data: T): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
export interface IRead<T> {
  find(
    filtered: {},
    limit: number,
    skip: number,
    populate: { path: string; select: string }
  ): Promise<T[]>;
  findOne(
    id: string
  ): Promise<IfAny<T, any, Document<unknown, {}, T> & Require_id<T>> | null>;
}
