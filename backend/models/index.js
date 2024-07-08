import { env } from "../configs/config.js";
import { Sequelize } from "sequelize";
import contactModel from "./contact.model.js";
import bookingModel from "./booking.model.js";
import attendeeModel from "./attendee.model.js";
import personModel from "./person.model.js";
import memberModel from "./member.model.js";
import articleModel from "./article.model.js";
import articlePictureModel from "./articlePicture.model.js";
import tournamentModel from "./tournament.model.js";
import participantModel from "./participant.model.js";
import gameModel from "./game.model.js";
import roundModel from "./round.model.js";
import playerModel from "./player.model.js";
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
attendeeModel(sequelize, Sequelize);
memberModel(sequelize, Sequelize);
personModel(sequelize, Sequelize);
articleModel(sequelize, Sequelize);
articlePictureModel(sequelize, Sequelize);
tournamentModel(sequelize, Sequelize);
participantModel(sequelize, Sequelize);
gameModel(sequelize, Sequelize);
roundModel(sequelize, Sequelize);
playerModel(sequelize, Sequelize);
playerRoundModel(sequelize, Sequelize);

const {
  Contact,
  Booking,
  Attendee,
  Member,
  Person,
  Article,
  ArticlePicture,
  Tournament,
  Participant,
  Game,
  Round,
  Player,
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

// Person => Attendee <= Booking
Person.belongsToMany(Booking, { through: Attendee, as: "attendees" });
Booking.belongsToMany(Person, { through: Attendee, as: "attendees" });
Person.hasMany(Attendee);
Booking.hasMany(Attendee);
Attendee.belongsTo(Person);
Attendee.belongsTo(Booking);

// Person = Member
Person.hasOne(Member);
Member.belongsTo(Person);

// Member => Participant <= Tournament
Member.belongsToMany(Tournament, { through: Participant, as: "tournaments" });
Tournament.belongsToMany(Member, { through: Participant, as: "members" });
Member.hasMany(Participant);
Tournament.hasMany(Participant);
Participant.belongsTo(Member);
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

// Member => Player <= Game
Member.belongsToMany(Game, { through: Player, as: "games" });
Game.belongsToMany(Member, { through: Player, as: "members" });
Member.hasMany(Player, { as: "players" });
Game.hasMany(Player, { as: "players" });
Player.belongsTo(Member);
Player.belongsTo(Game);

// Member => PlayerRound <= Round
Member.belongsToMany(Round, { through: PlayerRound, as: "rounds" });
Round.belongsToMany(Member, { through: PlayerRound, as: "members" });
Member.hasMany(PlayerRound, { as: "playerRounds" });
Round.hasMany(PlayerRound, { as: "playerRounds" });
PlayerRound.belongsTo(Member);
PlayerRound.belongsTo(Round);

await sequelize.sync({ alter: false, force: false });
console.log("Sync ok");

export {
  Contact,
  Booking,
  Attendee,
  Member,
  Person,
  Article,
  ArticlePicture,
  Tournament,
  Participant,
  Game,
  Round,
  Player,
  PlayerRound,
};
