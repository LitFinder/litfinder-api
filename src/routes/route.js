import {
  ChangePassword,
  CheckUser,
  ForgetPassword,
  RegisterUser,
} from "../services/auth/handler";
import { UpdateProfile, getProfile } from "../services/profile/handler";
import {
  BooksRecommendation,
  GetAllBook,
  GetBook,
} from "../services/book/handler";
import {
  GetMyBookself,
  InsertBookself,
  UpdateBook,
} from "../services/bookself/handler";
import { GetGenre } from "../services/genre/handler";
import { SendLog } from "../services/log/handler";
import {
  InsertBookPreference,
  InsertGenrePreference,
} from "../services/preference/handler";
import { GetAllRating, GetRatingFromId } from "../services/rating/handler";

const route = [
  {
    method: "POST",
    path: "/login",
    handler: CheckUser,
    options: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/send-kode",
    handler: ForgetPassword,
    options: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/change-password",
    handler: ChangePassword,
    options: {
      auth: false,
    },
  },
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
  },
  // {
  //   method: "GET",
  //   path: "/rating",
  //   handler: GetAllRating,
  //   options: {
  //     auth: false,
  //   },
  // },
  {
    method: "GET",
    path: "/book",
    handler: GetBook,
  },
  // {
  //   method: "GET",
  //   path: "/book/all",
  //   handler: GetAllBook,
  //   options: {
  //     auth: false,
  //   },
  // },
  {
    method: "POST",
    path: "/rating",
    handler: GetRatingFromId,
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
  },
  {
    method: "POST",
    path: "/bookself",
    handler: GetMyBookself,
  },
  {
    method: "POST",
    path: "/bookself/update",
    handler: UpdateBook,
  },
  {
    method: "POST",
    path: "/bookself/add",
    handler: InsertBookself,
  },
  {
    method: "GET",
    path: "/genre",
    handler: GetGenre,
  },
  {
    method: "POST",
    path: "/preference/genre/add",
    handler: InsertGenrePreference,
  },
  {
    method: "POST",
    path: "/preference/book/add",
    handler: InsertBookPreference,
  },
  {
    method: "POST",
    path: "/book/rating",
    handler: GetRating,
  },
];

export default route;
