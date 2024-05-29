import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";
import { LoginInput, User, UserInput } from "../../lib/types/user";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<User[]> {
    try {
      const url = this.path + "/user/top-users";
      const result = await axios.get(url);
      console.log("getTopUsers:", result);

      return result.data;
    } catch (err) {
      console.log("Error, getTopUsers:", err);
      throw err;
    }
  }
  public async getShop(): Promise<User> {
    try {
      const url = this.path + "/user/shop";
      const result = await axios.get(url);
      console.log("getShop:", result);

      const shop: User = result.data;
      return shop;
    } catch (err) {
      console.log("Error, getShop:", err);
      throw err;
    }
  }

  public async signup(input: UserInput): Promise<User> {
    try {
      const url = this.path + "/user/signup";
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("signup", result);

      const user: User = result.data.member;
      console.log("user:", user);
      localStorage.setItem("memberData", JSON.stringify(user));

      return user;
    } catch (err) {
      console.log("Error, signup:");
      throw err;
    }
  }

  public async login(input: LoginInput): Promise<User> {
    try {
      const url = this.path + "/user/login";
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("login", result);

      const user: User = result.data.user;
      console.log("user:", user);
      localStorage.setItem("memberData", JSON.stringify(user));

      return user;
    } catch (err) {
      console.log("Error, login:", err);
      throw err;
    }
  }
  public async logout(): Promise<boolean> {
    try {
      const url = this.path + "/user/logout";
      const result = await axios.post(url, {}, { withCredentials: true });
      console.log("logout", result);

      localStorage.removeItem("userData");

      return result.data.logout;
    } catch (err) {
      console.log("Error, logout:", err);
      throw err;
    }
  }
}

export default MemberService;
