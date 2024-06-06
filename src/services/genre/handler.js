import Genre from "./controller";

const GetGenre = async (req, res) => {
  const genre = await Genre.getGenre();

  return res
    .response({
      status: "success",
      data: genre,
    })
    .code(200);
};

export { GetGenre };
