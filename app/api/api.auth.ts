import type { register } from "module";
import { instance } from "./api.config.js";

export interface AuthInterface {
  username: string;
  password: string;
}

export const AuthService = {
  login(data: AuthInterface) {
    return instance.post("/login", data).then((res) => res.data.data.token);
  },

  register(data: AuthInterface) {
    return instance.post("/register", data).then((res) => res.data.message);
  },

  refreshToken() {
    return instance.get("/refresh");
  },

  logout() {
    return instance.post("/logout");
  },
};
