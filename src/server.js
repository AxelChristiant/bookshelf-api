import Hapi from "@hapi/hapi";
import {routes} from "./routes.js";
const INIT = async () => {
  const SERVER = Hapi.server({port: 5000,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });
  SERVER.route(routes);
  await SERVER.start();
  console.log(`Server berjalan pada ${SERVER.info.uri}`);
};
// eslint-disable-next-line new-cap
INIT();
