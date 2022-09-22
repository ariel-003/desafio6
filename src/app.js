import express, { json, urlencoded } from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import productsRouter from "./routes/products.js"
import msgRouter from "./routes/msg.js";
import { Msg } from "./class/msgClass.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/content", express.static("./src/public"));

const server = app.listen(PORT, () =>
  console.log(`server started http://localhost:${PORT}`)
);
server.on("error", (error) =>
  console.log(`Error en el servidor: `, error.message)
);
const io = new Server(server);

let products = []
const msgManager = new Msg("./src/data/msg.json")

//hbs config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.render("index");
});

//Routes
app.use("/productos", productsRouter);
app.use("/msg", msgRouter)

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected...`);

  socket.emit("historyProducts", products);
  socket.on("addProduct", (data) => {
    products = [...data]
    io.emit("historyProducts", products);
  });

  msgManager.getAll().then((msg)=> socket.emit("historyChat", msg))
  socket.on("addMsg", msg=>{
    io.emit("historyChat", msg)
  })
});