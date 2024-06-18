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

  if (rating && books.length != 0) {
    const ratingBook = await Rating.getRating({
      ids: books.map((book) => book.id),
    });

    books.forEach((book) => {
      const rating = ratingBook.filter((rating) => rating.book_id === book.id);
      book.rating = rating;
    });

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
  // const resultRecomendation = [5, 31, 33, 42, 45, 47, 120, 125, 128];
  // end from ml

  // comment connect to ml
  const dataId = logUser.data.map((data) => data.id);

  const recommendation = await fetch(`${process.env.MLURL}/recommendation`, {
    method: "POST",
    body: JSON.stringify({
      id_book: dataId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const ress = await recommendation.json();
  // from ml
  const resultRecomendation = ress.recommendations;

  // console.log(resultRecomendation);
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

  if (rating && books.length != 0) {
    const ratingBook = await Rating.getRating({
      ids: books.map((book) => book.id),
    });

    books.forEach((book) => {
      const rating = ratingBook.filter((rating) => rating.book_id === book.id);
      book.rating = rating;
    });

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

const ColabBook = async (request, h) => {
  const { limit, page, rating } = request.query;
  const { book_id } = request.payload ?? {
    book_id: null,
  };

  if (!book_id) {
    return h
      .response({
        status: "fail",
        message: "Book id is required",
      })
      .code(400);
  }

  if (limit && limit == 0) {
    return h
      .response({
        status: "fail",
        message: "Amount must be greater than 0",
      })
      .code(400);
  }

  const book = await Book.findBook({ id: book_id });

  const simmilarBook = await Book.getBookByCategory({
    category: book[0].categories,
    limit: limit,
    page: page,
  });

  if (rating && simmilarBook.length != 0) {
    const ratingBook = await Rating.getRating({
      ids: simmilarBook.map((book) => book.id),
    });

    simmilarBook.forEach((book) => {
      const rating = ratingBook.filter((rating) => rating.book_id === book.id);
      book.rating = rating;
    });
  }

  const recommendation = await fetch(
    `${process.env.MLURL}/colabBook/?id_book=${book_id}&amount=${limit ?? 10}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let result = [0];

  const ress = await recommendation.json();

  if (recommendation.status != 404) {
    result = ress.recommendations.map((book) => book);
  }

  const recommendationBook = await Book.getBookByIds({
    ids: result.map((id) => id),
    limit,
    page,
  });

  if (rating && recommendationBook.length != 0) {
    const ratingBook = await Rating.getRating({
      ids: recommendationBook.map((book) => book.id),
    });

    recommendationBook.forEach((book) => {
      const rating = ratingBook.filter((rating) => rating.book_id === book.id);
      book.rating = rating;
    });
  }

  const resultEnd = {
    recommendation: recommendationBook,
    fromCategory: simmilarBook,
  };

  return h.response({
    status: "success",
    data: resultEnd,
  });
};

const ColabUser = async (request, h) => {
  const { limit, page, rating } = request.query;
  const { user_id } = request.payload ?? {
    user_id: null,
  };

  if (!user_id) {
    return h
      .response({
        status: "fail",
        message: "Book id is required",
      })
      .code(400);
  }

  if (limit && limit == 0) {
    return h
      .response({
        status: "fail",
        message: "Amount must be greater than 0",
      })
      .code(400);
  }

  const recommendation = await fetch(
    `${process.env.MLURL}/colabUser/?user_id=${user_id}&amount=${limit ?? 10}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let result = [0];

  if (recommendation.status == 500) {
    return h.response({
      status: "success",
      data: [],
    });
  }

  const ress = await recommendation.json();

  if (recommendation.status != 404) {
    result = ress.recommendations.map((book) => book);
  }

  const recommendationBook = await Book.getBookByIds({
    ids: result.map((id) => id),
    limit,
    page,
  });

  if (rating && recommendationBook.length != 0) {
    const ratingBook = await Rating.getRating({
      ids: recommendationBook.map((book) => book.id),
    });

    recommendationBook.forEach((book) => {
      const rating = ratingBook.filter((rating) => rating.book_id === book.id);
      book.rating = rating;
    });
  }

  return h.response({
    status: "success",
    data: recommendationBook,
  });
};

export { GetBook, BooksRecommendation, GetAllBook, ColabBook, ColabUser };
