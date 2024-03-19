import { Repository } from "../../base/Repository";
import UserModel, { IUser } from "../userModel";

class AuthRepository extends Repository<IUser> {
  async login(email: string) {
    return UserModel.findOne({ email });
  }
}

export default new AuthRepository(UserModel);
