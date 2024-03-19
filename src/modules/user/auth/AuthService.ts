import { Service } from "../../base/Service";
import { IUser } from "../userModel";
import AuthRepository from "./AuthRepository";

class AuthService extends Service<IUser> {
  login(email: string) {
    return AuthRepository.login(email);
  }
}

export default new AuthService(AuthRepository);
