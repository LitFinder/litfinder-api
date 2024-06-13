import Rating from "./controller";

const GetAllRating = async (request, h) => {
  const rating = await Rating.getAllRating();

  if (rating.length == 0) {
    return h.response({
      status: "success",
      data: rating,
    });
  }

  return h.response({
    status: "success",
    data: rating,
  });
};

const GetRatingFromId = async (request, h) => {
  const { book_id } = request.payload ?? {
    book_id: null,
  };

  if (!book_id) {
    return h
      .response({
        status: "fail",
        message: "Book ID is required",
      })
      .code(400);
  }

  const rating = await Rating.getRatingsByBookId({ id: book_id});

  if (rating.length == 0) {
    return h.response({
      status: "success",
      data: rating,
    });
  }

  return h.response({
    status: "success",
    data: rating,
  });
};

export { GetAllRating, GetRatingFromId };
