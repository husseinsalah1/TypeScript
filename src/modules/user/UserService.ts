import { Service } from "../base/Service";
import UserRepository from "./UserRepository";
import { IUser } from "./userModel";

// Contain business logic
class UserService extends Service<IUser> {
  getUserByEmail(email: string) {
    return UserRepository.getUserByEmail(email);
  }

  async isEmailExist(email: string) {
    let isExist = await UserRepository.getUserByEmail(email);
    if (isExist) {
      return true;
    }

    return false;
  }
}

export default new UserService(UserRepository);
