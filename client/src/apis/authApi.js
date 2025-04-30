import { API } from "./api";

export async function loginApi(email, password) {
  try {
    const response = await API.post(`/auth/login`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (err) {
    console.error("Error in loginApi:", err);
    throw err;
  }
}

export async function registerApi(name, email, password) {
  try {
    const response = await API.post(`/auth/register`, {
      name: name,
      email: email,
      password: password,
    });
    return response.data;
  } catch (err) {
    console.error("Error in registerApi:", err);
    throw err;
  }
}

export const logoutApi = async () => {
  try {
    await API.get("/auth/logout");
  } catch (err) {
    console.error("Error in logoutApi:", err);
    throw err;
  }
};

export const verifyLoginApi = async () => {
  try {
    await API.get("/auth/verify_login");
  } catch (err) {
    console.error("Error in verifyLoginApi:", err);
    throw err;
  }
};
