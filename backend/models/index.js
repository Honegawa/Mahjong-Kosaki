import { env } from "../configs/config.js";
import { Sequelize } from "sequelize";
import contactModel from "./contact.model.js";
import bookingModel from "./booking.model.js";
import personModel from "./person.model.js";
import articleModel from "./article.model.js";
import articlePictureModel from "./articlePicture.model.js";
import tournamentModel from "./tournament.model.js";
import participantModel from "./participant.model.js";
import gameModel from "./game.model.js";
import roundModel from "./round.model.js";
import playerRoundModel from "./playerRound.model.js";

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
personModel(sequelize, Sequelize);
articleModel(sequelize, Sequelize);
articlePictureModel(sequelize, Sequelize);
tournamentModel(sequelize, Sequelize);
participantModel(sequelize, Sequelize);
gameModel(sequelize, Sequelize);
roundModel(sequelize, Sequelize);
playerRoundModel(sequelize, Sequelize);

const {
  Contact,
  Booking,
  Person,
  Article,
  ArticlePicture,
  Tournament,
  Participant,
  Game,
  Round,
  PlayerRound,
} = sequelize.models;

// Article => Picture
Article.hasMany(ArticlePicture, {
  as: "pictures",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
ArticlePicture.belongsTo(Article);

// Person => Contact
Person.hasMany(Contact, { as: "contacts" });
Contact.belongsTo(Person);

// Person => Booking
Person.hasMany(Booking, { as: "bookings" });
Booking.belongsTo(Person);

// Person => Participant <= Tournament
Person.belongsToMany(Tournament, { through: Participant, as: "tournaments" });
Tournament.belongsToMany(Person, { through: Participant, as: "people" });
Person.hasMany(Participant);
Tournament.hasMany(Participant);
Participant.belongsTo(Person);
Participant.belongsTo(Tournament);

// Tournament => Game
Tournament.hasMany(Game, { as: "games" });
Game.belongsTo(Tournament);

// Game => Round
Game.hasMany(Round, {
  as: "rounds",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
Round.belongsTo(Game);

// Person => PlayerRound <= Round
Person.belongsToMany(Round, { through: PlayerRound, as: "rounds" });
Round.belongsToMany(Person, { through: PlayerRound, as: "people" });
Person.hasMany(PlayerRound, { as: "playerRounds" });
Round.hasMany(PlayerRound, { as: "playerRounds" });
PlayerRound.belongsTo(Person);
PlayerRound.belongsTo(Round);

await sequelize.sync({ alter: true, force: false });
console.log("Sync ok");

export {
  Contact,
  Booking,
  Person,
  Article,
  ArticlePicture,
  Tournament,
  Participant,
  Game,
  Round,
  PlayerRound,
};
