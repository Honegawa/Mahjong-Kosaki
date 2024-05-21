import { Sequelize } from "sequelize";
import contactModel from "./contact.model.js";
import bookingModel from "./booking.model.js";
import memberModel from "./member.model.js";
import articleModel from "./article.models.js"
import { env } from "../configs/config.js";

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  dialect: env.DB_TYPE,
});
try {
  await sequelize.authenticate();
  console.log("Connection to DB succeed");
} catch (error) {
  console.log(error);
}

contactModel(sequelize, Sequelize);
bookingModel(sequelize, Sequelize);
memberModel(sequelize, Sequelize);
articleModel(sequelize, Sequelize);

const { Contact, Booking, Member, Article } = sequelize.models;

await sequelize.sync({ alter: true, force: true });
console.log("Sync ok");

export { Contact, Booking, Member, Article };
