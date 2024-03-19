import mongoose, { IfAny, Document, Require_id } from "mongoose";
import { IRead, IWrite } from "./BaseInterface";

export class Repository<T> implements IRead<T>, IWrite<T> {
  constructor(public collection: mongoose.Model<T>) {}
  async create(data: T): Promise<T> {
    const user = await this.collection.create(data);
    return user;
  }
  async update(id: string, updatedData: Partial<T>): Promise<T | null> {
    return await this.collection.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
  }

  async delete(id: string): Promise<T | null> {
    return await this.collection.findByIdAndDelete(id);
  }
  async findOne(
    id: string
  ): Promise<IfAny<T, any, Document<unknown, {}, T> & Require_id<T>> | null> {
    return await this.collection.findById(id);
  }

  async find(
    filtered: {},
    skip: number,
    limit: number,
    populate: { path: string; select: string }
  ): Promise<T[]> {
    return this.collection
      .find(filtered)
      .skip(skip)
      .limit(limit)
      .populate(populate);
  }
}
