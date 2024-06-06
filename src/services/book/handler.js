import Log from "../log/controller";
import Rating from "../rating/controller";
import Book from "./controller";

const GetBook = async (request, h) => {
  const { limit, page, search } = request.query;


  const books = await Book.getBooks({ limit, page, search });

  if (books.length == 0) {
    return h.response({
      status: "success",
      data: books,
    });
  }

  //   relasikan books dengan rating berdasarkan title_book

  const rating = await Rating.getRating({
    title_book: books.map((book) => `"${book.title}"`),
  });

  const newBook = books.map((book) => {
    const bookRating = rating.filter((rate) => rate.title == book.title);
    return {
      ...book,
      rating: bookRating ? bookRating : null,
    };
  });

  return h.response({
    status: "success",
    data: newBook,
  });
};

const BooksRecommendation = async (request, h) => {
  const { limit, page } = request.query;
  const { user_id } = request.payload ?? {
    user_id: null,
  };

  if (!user_id) {
    return h
      .response({
        status: "fail",
        message: "User id is required",
      })
      .code(400);
  }

  const bookUser = await Log.getLogByUserId({ userId: user_id });

  const logUser = {
    user_id,
    data: bookUser,
  };

  console.log(logUser);

  // from ml
  const resultRecomendation = [5, 31, 33, 42, 45, 47, 120, 125, 128];
  // end from ml

  const books = await Book.getBookByIds({
    ids: resultRecomendation.map((id) => id),
    limit,
    page,
  });

  if (books.length == 0) {
    return h.response({
      status: "success",
      data: books,
    });
  }

  const rating = await Rating.getRating({
    title_book: books.map((book) => `"${book.title}"`),
  });

  const newBook = books.map((book) => {
    const bookRating = rating.filter((rate) => rate.title == book.title);
    return {
      ...book,
      rating: bookRating ? bookRating : null,
    };
  });

  return h.response({
    status: "success",

    data: newBook,
  });
};

export { GetBook, BooksRecommendation };
