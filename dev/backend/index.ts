import * as http from "http";
import * as express from "express";
import * as path from "path";
import { initSocketIO } from "./lib/socketio-events";

import { rootRouter } from "./routes/root";

const app = express();
const httpServer = http.createServer(app);
const io = initSocketIO(httpServer);
const port = 80;

app.use("/static", express.static(path.resolve(`${__dirname}/build/static/`)));
app.use("/", rootRouter);

httpServer.listen(port, () => {
  console.log(`listening on *: ${port}`);
});
