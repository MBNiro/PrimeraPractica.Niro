import "./db/database.js";
import express from "express";
import morgan from "morgan";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import MessagesManager from "./daos/filesystem/messages.dao.js";
import { __dirname } from "./path.js";
const messagesManager = new MessagesManager(
  __dirname + "/daos/filesystem/messages.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(morgan("dev"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));
app.use("/products", productsRouter);
app.use("/chat", viewsRouter);

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log("Server ok on port 8080");
});

const socketServer = new Server(httpServer);

socketServer.on("connection ok", async (socket) => {
  console.log("New connection", socket.id);

  socketServer.emit("messages", await messagesManager.getAllMsg());

  socket.on("disconnect", () => {
    console.log("User disconnect");
  });

  socket.on("newUser", (user) => {
    console.log(`${user} is logged in`);
  });

  socket.on("chat:message", async (msg) => {
    await messagesManager.createMsg(msg);
    socketServer.emit("messages", await messagesManager.getAllMsg());
  });

  socket.on("newUser", (user) => {
    socket.broadcast.emit("newUser", user);
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});