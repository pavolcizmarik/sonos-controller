const socketio = require("socket.io")({
  allowEIO3: true,
});

module.exports.listen = function listen(app) {
  const io = socketio.listen(app);
  return io;
};