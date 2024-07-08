import personModel from "./person.model.js";
import bookingModel from "./booking.model.js";

export default (sequelize, DataType) => {
  sequelize.define("Attendee", {
    PersonId: {
      type: DataType.INTEGER,
      references: {
        model: personModel,
        key: "id",
      },
    },
    BookingId: {
      type: DataType.INTEGER,
      references: {
        model: bookingModel,
        key: "id",
      },
    },
  });
};
