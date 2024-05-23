import { env } from "../configs/config.js";
import { Sequelize } from "sequelize";
import contactModel from "./contact.model.js";
import bookingModel from "./booking.model.js";
import memberModel from "./member.model.js";
import articleModel from "./article.model.js";
import articlePictureModel from "./articlePicture.model.js";
import tournamentModel from "./tournament.model.js";
import participantModel from "./participant.model.js";
import gameModel from "./game.model.js";

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
articlePictureModel(sequelize, Sequelize);
tournamentModel(sequelize, Sequelize);
participantModel(sequelize, Sequelize);
gameModel(sequelize, Sequelize);

const {
  Contact,
  Booking,
  Member,
  Article,
  ArticlePicture,
  Tournament,
  Participant,
  Game,
} = sequelize.models;

// Article => Picture
Article.hasMany(ArticlePicture, {
  as: "pictures",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
ArticlePicture.belongsTo(Article);

// Member => Participant <= Tournament
Member.belongsToMany(Tournament, { through: Participant, as: "tournaments" });
Tournament.belongsToMany(Member, { through: Participant, as: "members" });
Member.hasMany(Participant);
Tournament.hasMany(Participant);
Participant.belongsTo(Member);
Participant.belongsTo(Tournament);

// Tournament => Game
Tournament.hasMany(Game, {
  as: "games",
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});
Game.belongsTo(Tournament);

await sequelize.sync({ alter: false, force: false });
console.log("Sync ok");

export {
  Contact,
  Booking,
  Member,
  Article,
  ArticlePicture,
  Tournament,
  Participant,
  Game,
};
