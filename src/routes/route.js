import { CheckUser, RegisterUser } from "../services/auth/handler";
import { BooksRecommendation, GetBook } from "../services/book/handler";
import {
  GetMyBookself,
  InsertBookself,
  UpdateBook,
} from "../services/bookself/handler";
import { GetGenre } from "../services/genre/handler";
import { SendLog } from "../services/log/handler";
import { InsertBookPreference, InsertGenrePreference } from "../services/preference/handler";

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
];

export default route;
