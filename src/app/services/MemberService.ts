import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";
import { User, UserInput } from "../../lib/types/user";

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
      const url = this.path + "/member/signup";
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("signup", result);

      const user: User = result.data.member;
      console.log("member:", user);
      localStorage.setItem("memberData", JSON.stringify(user));

      return user;
    } catch (err) {
      console.log("Error, signup:");
      throw err;
    }
  }
}

export default MemberService;
