// buatkan simple api menggunakan hapi js
require("dotenv").config();

import Hapi from "@hapi/hapi";
import route from "./routes/route";

const init = async () => {
  const server = Hapi.server({
    port: 1234,
    host: "127.0.0.1",
  });

  server.route(route);

  server.ext("onPreResponse", function (request, h) {
    const response = request.response;

    if (response.isBoom) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(413);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
