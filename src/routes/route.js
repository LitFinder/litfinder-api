import { CheckUser, RegisterUser } from "../services/auth/handler";
import { UpdateProfile, getProfile } from "../services/profile/handler";

const route = [
  {
    method: "GET",
    path: "/",
    handler: () => {
      return "tes";
    },
  },
  {
    method: "POST",
    path: "/login",
    handler: CheckUser,
    options: {
      auth: false,
    },
  },

  // route register
  {
    method: "POST",
    path: "/register",
    handler: RegisterUser,
    options: {
      auth: false,
    },
  },

  {
    method: "POST",
    path: "/profile/update",
    handler: UpdateProfile,
    options: {
      auth: false,
    },
  },
];

export default route;
