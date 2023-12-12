import axios from "axios";

const instance = axios.create({
  baseURL: process.env.baseURL,
});

const get = async (url: string, token: any, lang = "en") => {
  let res;
  try {
    res = await instance.get(url, {
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

const post = async (url: string, form_data: any, token: any, lang = "en") => {
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
    return error;
  }

  return res?.data;
};

const multipart = async (url: string, token: any, lang = "en") => {
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

const destroy = async (url: string, token: any, lang = "en") => {
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
