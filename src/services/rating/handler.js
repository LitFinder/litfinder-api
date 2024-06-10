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

export { GetAllRating };
