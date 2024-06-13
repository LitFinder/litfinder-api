import Log from "../log/controller";
import Rating from "../rating/controller";
import Book from "./controller";

const GetAllBook = async (request, h) => {
  const books = await Book.getAllBooks();

  if (books.length == 0) {
    return h.response({
      status: "success",
      data: books,
    });
  }

  return h.response({
    status: "success",
    data: books,
  });
};

const GetBook = async (request, h) => {
  const { limit, page, search, rating } = request.query;

  const books = await Book.getBooks({ limit, page, search });

  if (books.length == 0) {
    return h.response({
      status: "success",
      data: books,
    });
  }

  if (rating) {
    const ratingBook = await Rating.getRating({
      ids: books.map((book) => book.id),
    });

    books.forEach((book) => {
      const rating = ratingBook.filter((rating) => rating.book_id === book.id);
      book.rating = rating;
    });

    return h.response({
      status: "success123",
      data: books,
    });
  }

  return h.response({
    status: "success",
    data: books,
  });
};

const BooksRecommendation = async (request, h) => {
  const { limit, page, rating } = request.query;
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

  // from ml
  const resultRecomendation = [5, 31, 33, 42, 45, 47, 120, 125, 128];
  // end from ml

  // comment connect to ml
  // const dataId = logUser.data.map((data) => data.id);

  // const recommendation = await fetch(
  //   "https://8e01-103-168-190-2.ngrok-free.app/recommendation",
  //   {
  //     method: "POST",
  //     body: JSON.stringify({
  //       id_book: dataId,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );

  // const ress = await recommendation.json();
  // // from ml
  // const resultRecomendation = ress.recommendations;

  // console.log(resultRecomendation);
  // // end from ml

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

  if (rating) {
    const ratingBook = await Rating.getRating({
      ids: books.map((book) => book.id),
    });

    books.forEach((book) => {
      const rating = ratingBook.filter((rating) => rating.book_id === book.id);
      book.rating = rating;
    });

    return h.response({
      status: "success123",
      data: books,
    });
  }

  return h.response({
    status: "success",
    data: books,
  });
};

export { GetBook, BooksRecommendation, GetAllBook };
