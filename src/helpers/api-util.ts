import { AxiosRequestConfig } from "axios";

export default class ApiUtil {
  static axiosDefaultConfig(
    token: string,
    others?: object
  ): Partial<AxiosRequestConfig> {
    return {
      headers: { Authorization: `Bearer ${token}` },
      ...(others ?? {}),
    };
  }
}
