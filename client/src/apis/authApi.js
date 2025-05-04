import { API } from "./api";

export async function loginApi(formData) {
  try {
    const response = await API.post(`/auth/login`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}
export async function registerApi(name, email, password) {
  try {
    const response = await API.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export const logoutApi = async () => {
  try {
    await API.get("/auth/logout");
  } catch (err) {
    throw err;
  }
};

export const accessTokenApi = async () => {
  try {
    const response = await API.get("/auth/access-token");
    return response.data;
  } catch (err) {
    throw err;
  }
};
