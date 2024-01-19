import axios from "axios";
import routeConfig from "@/components/constant/route";
import { useAppSelector } from "@/store/hooks";
import { useAuth } from "@/hooks/useAuth";

const instance = axios.create({
  baseURL: process.env.baseURL,
});

type ResponseType = {
  status: boolean;
  message: string;
  status_code: number;
  data: any;
  page?: number;
  perPage?: number;
  total?: number;
};

const get = async (
  url: string,
  token: any,
  params?: any,
  lang = "en"
): Promise<ResponseType | null> => {
  // const token = window.localStorage.getItem(routeConfig.storageTokenKeyName)!;
  let res;
  try {
    res = await instance.get(url, {
      params: params,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });
  } catch (error) {
    return null;
  }
  return res?.data;
};

const post = async (
  url: string,
  form_data: any,
  token: any,
  lang = "en"
): Promise<ResponseType | null> => {
  let res;

  // const token = window.localStorage.getItem(routeConfig.storageTokenKeyName)!;
  try {
    res = await instance.post(url, form_data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });
  } catch (error) {
    return null;
  }

  return res?.data;
};

const put = async (
  url: string,
  form_data: any,
  token: any,
  lang = "en"
): Promise<ResponseType | null> => {
  let res;
  // const token = window.localStorage.getItem(routeConfig.storageTokenKeyName)!;
  try {
    res = await instance.put(url, form_data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });
  } catch (error) {
    return null;
  }

  return res?.data;
};

const multipart = async (
  url: string,
  token: any,
  lang = "en"
): Promise<ResponseType | null> => {
  let res;
  // const token = window.localStorage.getItem(routeConfig.storageTokenKeyName)!;
  try {
    res = await instance.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });
  } catch (error) {
    return null;
  }
  return res?.data;
};

const destroy = async (
  url: string,
  token: any,
  lang = "en"
): Promise<ResponseType | null> => {
  let res;
  // const token = window.localStorage.getItem(routeConfig.storageTokenKeyName)!;
  try {
    res = await instance.delete(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });
  } catch (error) {
    return null;
  }
  return res?.data;
};

export { get, post, put, multipart, destroy };
