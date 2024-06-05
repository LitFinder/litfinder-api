import { Preference } from "./controller";

const InsertGenrePreference = async (req, res) => {
  const { user_id, genres = [] } = req.payload ?? {
    user_id: null,
    genres: [],
  };

  if (!user_id || genres.length === 0) {
    throw new InputError();
  }

  const preference = await Preference.insertGenrePreference({
    user_id,
    genres,
  });

  if (preference) {
    return res
      .response({
        status: "success",
        data: "Preference has been inserted",
      })
      .code(200);
  }

  return res
    .response({
      status: "error",
      message: "Failed to insert preference",
    })
    .code(500);
};

export { InsertGenrePreference };
