import axios from "axios";

const instance = axios.create({
  baseURL: process.env.baseURL,
});

type ResponseType = {
  status: boolean;
  message: string;
  status_code: number;
  data: Array<any>;
  page?: number;
  perPage?: number;
  total?: number;
};

const get = async (
  url: string,
  params?: any,
  token?: any,
  lang = "en"
): Promise<ResponseType | null> => {
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
  token = null,
  lang = "en"
): Promise<ResponseType | null> => {
  let res;
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
    console.log(error);
    return null;
  }

  return res?.data;
};

const multipart = async (
  url: string,
  token = null,
  lang = "en"
): Promise<ResponseType | null> => {
  let res;
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
    console.log(error);
    return null;
  }
  return res?.data;
};

const destroy = async (
  url: string,
  token = null,
  lang = "en"
): Promise<ResponseType | null> => {
  let res;
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
    console.log(error);
    return null;
  }
  return res?.data;
};

export { get, post, multipart, destroy };
