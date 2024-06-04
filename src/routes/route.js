import { CheckUser, RegisterUser } from "../services/auth/handler";
import { BooksRecommendation, GetBook } from "../services/book/handler";
import { SendLog } from "../services/log/handler";

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
    method: "GET",
    path: "/book",
    handler: GetBook,
  },
  {
    method: "POST",
    path: "/log",
    handler: SendLog,
  },
  {
    method: "POST",
    path: "/recommendation",
    handler: BooksRecommendation,
  }
];

export default route;
