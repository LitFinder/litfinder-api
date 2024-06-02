// setup dotenv
import "dotenv/config";

import Hapi from "@hapi/hapi";
import route from "./routes/route";
import Jwt from "hapi-auth-jwt2";
import validate from "./auth/validate";
import Inputrror from "./error/InputError";

const init = async () => {
  const server = Hapi.server({
    port: 1234,
    host: "127.0.0.1",
  });

  await server.register(Jwt);
  server.auth.strategy("jwt", "jwt", {
    key: process.env.JWT_KEY, // Never Share your secret key
    validate, // validate function defined above
  });

  server.auth.default("jwt");

  server.route(route);

  server.ext("onPreResponse", function (request, h) {
    const response = request.response;

    if (response instanceof Inputrror) {
      const newResponse = h.response({
        status: "fail",
        message: "Invalid request payload input",
      });
      newResponse.code(413);
      
      return newResponse;
    }

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
