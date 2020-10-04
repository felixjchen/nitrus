declare var require: any;

let app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);

const port = 80;

app.get("/", (req, res) => {
  res.send("hi");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

http.listen(port, () => {
  console.log(`listening on *: ${port}`);
});
