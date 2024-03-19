import { Repository } from "../base/Repository";
import UserModel, { IUser } from "./userModel";

// Repository => Dealing with database
class UserRepository extends Repository<IUser> {
  async getUserByEmail(email: string) {
    let user = await UserModel.findOne({ email });
    return user;
  }
}

export default new UserRepository(UserModel);
