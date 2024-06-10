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
      .code(201);
  }

  return res
    .response({
      status: "error",
      message: "Failed to insert preference",
    })
    .code(500);
};

const InsertBookPreference = async (req, res) => {
  const { user_id, books = [] } = req.payload ?? {
    user_id: null,
    books: [],
  };

  if (!user_id || books.length === 0) {
    throw new InputError();
  }

  const preference = await Preference.insertBookPreference({
    user_id,
    books,
  });

  if (preference) {
    return res
      .response({
        status: "success",
        data: "Preference has been inserted",
      })
      .code(201);
  }

  return res
    .response({
      status: "error",
      message: "Failed to insert preference",
    })
    .code(500);
};

export { InsertGenrePreference, InsertBookPreference };
