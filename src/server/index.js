const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.send("<h1>Hi</h1>");
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("chat message", function(msg) {
    console.log("message: " + msg);
  });
});

http.listen(3001, function() {
  console.log(`listening on : 3001`);
});
