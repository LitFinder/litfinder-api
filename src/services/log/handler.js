import Log from "./controller";

const SendLog = async (request, h) => {
  const { user_id, book_id } = request.payload ?? {
    user_id: null,
    book_id: null,
  };

  if (!user_id || !book_id) {
    return h
      .response({
        status: "fail",
        message: "User id and book id is required",
      })
      .code(400);
  }

  const log = await Log.sendLog({ userId: user_id, bookId: book_id });

  if (log) {
    return h
      .response({
        status: "success",
        message: "Log has been sent",
      })
      .code(201);
  }

  return h
    .response({
      status: "fail",
      message: "Failed to send log",
    })
    .code(400);
};

export { SendLog };
