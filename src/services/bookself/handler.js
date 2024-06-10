import Book from "../book/controller";
import Rating from "../rating/controller";
import Bookself from "./controller";
import InputError from "../../error/InputError";

const GetMyBookself = async (req, res) => {
  const { user_id, filter } = req.payload ?? {
    user_id: null,
    filter: "all",
  };

  const { limit, page } = req.query;

  if (!user_id) {
    return res
      .response({
        status: "fail",
        message: "User id is required",
      })
      .code(400);
  }

  const bookself = await Bookself.getMyBookSelf({
    user_id,
    limit,
    page,
    filter,
  });

  if (bookself.length == 0) {
    return res
      .response({
        status: "success",
        data: bookself,
      })
      .code(200);
  }

  const book = await Book.getBookByIds({
    ids: bookself.map((book) => book.book_id ?? 0),
    isLimit: false,
  });

  const rating = await Rating.getRatingsById({
    id: bookself.map((item) => item.rating_id ?? 0),
  });

  const newBookself = bookself.map((item) => {
    const listBook = book.filter((it) => it.id == item.book_id);
    const listRating = rating.find((it) => it.id == item.rating_id);
    return {
      ...item,
      book: listBook ? listBook : null,
      rating: listRating ? listRating : null,
    };
  });

  return res
    .response({
      status: "success",
      data: newBookself,
    })
    .code(200);
};

const addRating = async (req, res) => {
  const {
    title,
    user_id,
    profileName,
    reviewHelpfulness,
    reviewScore,
    reviewSummary,
    reviewText,
  } = req.payload ?? {
    title: null,
    user_id: null,
    profileName: null,
    reviewHelpfulness: null,
    reviewScore: null,
    reviewSummary: null,
    reviewText: null,
  };

  if (
    !title ||
    !user_id ||
    !profileName ||
    !reviewHelpfulness ||
    !reviewScore ||
    !reviewSummary ||
    !reviewText
  ) {
    throw new InputError();
  }

  const rating = await Rating.insertRating({
    title,
    user_id,
    profileName,
    reviewHelpfulness,
    reviewScore,
    reviewSummary,
    reviewText,
  });

  if (rating) {
    return rating.insertId;
  }

  return null;
};

const UpdateBook = async (req, res) => {
  const { bookself_id, status } = req.payload ?? {
    bookself_id: null,
    status: null,
  };

  if (!bookself_id || !status) {
    return res
      .response({
        status: "fail",
        message: "Bookself ID and status is required",
      })
      .code(400);
  }

  if (status == "finish") {
    const rating = await addRating(req, res);

    if (rating) {
      const bookself = await Bookself.updateBookself({
        id: bookself_id,
        status,
        rating_id: rating,
      });

      if (bookself) {
        return res
          .response({
            status: "success",
            message: "Bookself has been updated",
          })
          .code(200);
      }

      return res
        .response({
          status: "fail",
          message: "Failed to update bookself",
        })
        .code(400);
    }
  }

  const bookself = await Bookself.updateBookself({ id: bookself_id, status });

  if (bookself) {
    return res
      .response({
        status: "success",
        message: "Bookself has been updated",
      })
      .code(200);
  }

  return res
    .response({
      status: "fail",
      message: "Failed to update bookself",
    })
    .code(400);
};

const InsertBookself = async (req, res) => {
  const { user_id, book_id } = req.payload ?? {
    user_id: null,
    book_id: null,
  };

  if (!user_id || !book_id) {
    return res
      .response({
        status: "fail",
        message: "User id and book id is required",
      })
      .code(400);
  }

  const findBookself = await Bookself.findBookself({ user_id, book_id });

  if (findBookself.length > 0) {
    return res
      .response({
        status: "fail",
        message: "Book already in bookself",
      })
      .code(400);
  }

  const bookself = await Bookself.insertBookself({ user_id, book_id });

  if (bookself) {
    return res
      .response({
        status: "success",
        message: "Book has been added to bookself",
      })
      .code(201);
  }

  return res
    .response({
      status: "fail",
      message: "Failed to add book to bookself",
    })
    .code(400);
};

export { GetMyBookself, UpdateBook, InsertBookself };
