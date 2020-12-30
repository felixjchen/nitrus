import * as express from "express";
import * as path from "path";

import { rootRouter } from "./routes/root";
import { app, httpServer, port } from "./global";
import { createSocketIOEvents } from "./socketio/events";

createSocketIOEvents();

app.use("/static", express.static(path.resolve(`${__dirname}/build/static/`)));
app.use("/", rootRouter);

httpServer.listen(port, () => {
  console.log(`HTTP server is ready and listening on *: ${port}`);
});
