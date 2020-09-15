import Login from "../models/login";
import ResponseToken from "../models/response-token";
import axios from "axios";
import localforage from "localforage";
import { API_URL, TOKEN_KEY } from "../constants/default";
import User from "../models/user";
import ApiUtil from "../helpers/api-util";

export default class UserApi {
  static async getLoginToken(): Promise<string> {
    return (await localforage.getItem(TOKEN_KEY)) ?? "";
  }

  static async login(login: Login): Promise<void> {
    try {
      const response = await axios.post<ResponseToken>(
        `${API_URL}/auth/login`,
        login
      );

      const responseToken = response.data;

      await localforage.setItem<string>(TOKEN_KEY, responseToken.token);
    } catch (e) {
      throw e;
    }
  }

  static async createAdmin(user: User): Promise<User> {
    try {
      const token = await this.getLoginToken();

      const response = await axios.post<User>(
        `${API_URL}/user/admin`,
        user,
        ApiUtil.axiosDefaultConfig(token)
      );

      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static async logout(): Promise<void> {
    const token = await this.getLoginToken();

    await localforage.removeItem(TOKEN_KEY);

    await axios.post<ResponseToken>(
      `${API_URL}/auth/logout`,
      null,
      ApiUtil.axiosDefaultConfig(token)
    );
  }

  static async tokenRefresh(): Promise<void> {
    const token = await this.getLoginToken();

    const response = await axios.post<ResponseToken>(
      `${API_URL}/auth/refresh`,
      null,
      ApiUtil.axiosDefaultConfig(token)
    );

    const responseToken = response.data;

    await localforage.setItem<string>(TOKEN_KEY, responseToken.token);
  }

  static async findMe(): Promise<User> {
    const token = await this.getLoginToken();

    const response = await axios.get<User>(
      `${API_URL}/user/me`,
      ApiUtil.axiosDefaultConfig(token)
    );

    return response.data;
  }

  static async findAll(): Promise<User[]> {
    const token = await this.getLoginToken();

    const response = await axios.get<User[]>(
      `${API_URL}/user`,
      ApiUtil.axiosDefaultConfig(token)
    );

    return response.data;
  }

  static async updateAdmin(user: User): Promise<User> {
    const token = await this.getLoginToken();

    const id = user.id;
    delete user.id;

    const response = await axios.put<User>(
      `${API_URL}/user/admin/${id ?? ""}`,
      user,
      ApiUtil.axiosDefaultConfig(token)
    );

    return response.data;
  }

  static async delete(user: User): Promise<void> {
    const token = await this.getLoginToken();

    await axios.delete<void>(
      `${API_URL}/user/${user.id ?? ""}`,
      ApiUtil.axiosDefaultConfig(token)
    );
  }
}
