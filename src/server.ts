import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import morgan from "morgan";

// ? Conexion a bd
export const connectDB = async () => {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.blue.bold("conexion exitosa ala bd"));
  } catch (error) {
    // console.log(error);
    console.log(colors.red.bold("Error al conectar la base de datos"));
  }
};

// ? instancia de express
const server = express();

connectDB();

const frontEndUrl = process.env.FRONTEND_URL;

// ? Permitir conexiones

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin === frontEndUrl) {
      callback(null, true);
    } else {
      callback(new Error("Error de Cors"));
    }
    console.log(origin);
  },
};

server.use(cors(corsOptions));

// ? Ler datos
server.use(express.json());

//? use morgan
server.use(morgan("dev"));

//? Routing
server.use("/api/products", router);

//? Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
