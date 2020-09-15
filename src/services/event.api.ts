import axios from "axios";
import { API_URL } from "../constants/default";
import Event from "../models/event";
import UserApi from "./user.api";
import ApiUtil from "../helpers/api-util";

export default class EventApi {
  static async create(event: Event): Promise<Event> {
    try {
      const token = await UserApi.getLoginToken();

      const response = await axios.post<Event>(
        `${API_URL}/event`,
        event,
        ApiUtil.axiosDefaultConfig(token)
      );

      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static async findAll(): Promise<Event[]> {
    const token = await UserApi.getLoginToken();

    const response = await axios.get<Event[]>(
      `${API_URL}/event`,
      ApiUtil.axiosDefaultConfig(token)
    );

    return response.data;
  }

  static async update(event: Event): Promise<Event> {
    const token = await UserApi.getLoginToken();

    const id = event.id;
    delete event.id;

    const response = await axios.put<Event>(
      `${API_URL}/event/${id ?? ""}`,
      event,
      ApiUtil.axiosDefaultConfig(token)
    );

    return response.data;
  }

  static async delete(event: Event): Promise<void> {
    const token = await UserApi.getLoginToken();

    await axios.delete<void>(
      `${API_URL}/event/${event.id ?? ""}`,
      ApiUtil.axiosDefaultConfig(token)
    );
  }

  static async downloadReport(event: Event): Promise<void> {
    const token = await UserApi.getLoginToken();

    const response = await axios.get<BlobPart>(
      `${API_URL}/event/report/${event.id ?? ""}`,
      ApiUtil.axiosDefaultConfig(token, {
        responseType: "blob",
      })
    );

    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    window.open(window.URL.createObjectURL(blob));
  }
}
