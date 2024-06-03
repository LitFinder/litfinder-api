import Rating from "../rating/controller";
import Book from "./controller";

const GetBook = async (request, h) => {
  const { limit, page } = request.query;

  const books = await Book.getBooks({ limit, page });

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
    data: {
      newBook,
    },
  });
};

export { GetBook };
