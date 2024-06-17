import {
  ChangePassword,
  CheckUser,
  ForgetPassword,
  RegisterUser,
} from "../services/auth/handler";
import {
  UpdateBio,
  UpdateName,
  UpdatePassword,
  UpdatePicture,
  UpdateProfile,
  getProfile,
} from "../services/profile/handler";
import {
  BooksRecommendation,
  ColabBook,
  ColabUser,
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
  GetGenreByUserId,
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
    path: "/recommendation/colabBook",
    handler: ColabBook,
  },
  {
    method: "POST",
    path: "/recommendation/colabUser",
    handler: ColabUser,
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
    path: "/preference/genre/user",
    handler: GetGenreByUserId,
  },
  {
    method: "POST",
    path: "/profile/picture",
    handler: UpdatePicture,
    // buat gambar
    options: {
      payload: {
        output: "stream",
        multipart: true,
        allow: ["multipart/form-data"],
        maxBytes: 3 * 1000 * 1000,
      },
    },
  },
  {
    method: "POST",
    path: "/profile/name",
    handler: UpdateName,
  },
  {
    method: "POST",
    path: "/profile/bio",
    handler: UpdateBio,
  },
  {
    method: "POST",
    path: "/profile/password",
    handler: UpdatePassword,
  },
];

export default route;
