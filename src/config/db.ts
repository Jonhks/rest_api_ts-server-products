import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + "/../models/**/*"],
  logging: false,
});

// ? otra opcion para solucionar el problema de los SSL
// DATABASE_URL,
// {
//   dialectOptions: {
//     ssl: {
//       require: false,
//     },
//   },
// }

export default db;
