// import { IRead, IWrite } from "./Repository";
import mongoose, { Document, IfAny, Require_id } from "mongoose";
import UserRepository from "../user/UserRepository";
import UserModel, { IUser } from "../user/userModel";
import { IRead, IWrite } from "./BaseInterface";
import { Repository } from "./Repository";

export class Service<T> implements IWrite<T>, IRead<T> {
  constructor(public repository: Repository<T>) {}

  async create(data: T): Promise<T> {
    return this.repository.create(data);
  }
  async update(id: string, updatedData: Partial<T>): Promise<T | null> {
    return this.repository.update(id, updatedData);
  }
  async delete(id: string): Promise<T | null> {
    return this.repository.delete(id);
  }
  async findOne(
    id: string
  ): Promise<mongoose.IfAny<
    T,
    any,
    mongoose.Document<unknown, {}, T> & mongoose.Require_id<T>
  > | null> {
    const x = await this.repository.findOne(id);

    return await this.repository.findOne(id);
  }
  async find(
    filtered: {},
    skip: number,
    limit: number,
    populate: { path: string; select: string }
  ): Promise<T[]> {
    let x = await this.repository.find(filtered, skip, limit, populate);

    return x;
  }
}
