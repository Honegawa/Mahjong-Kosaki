export default (sequelize, DataType) => {
  sequelize.define(
    "Booking",
    {
      date: {
        type: DataType.DATE,
        allowNull: false,
      },
      type: {
        type: DataType.STRING,
        allowNull: false,
      },
      format: {
        type: DataType.TINYINT,
        allowNull: false,
        validate: {
          min: 2,
          max: 4,
        },
      },
    },
    {
      timestamps: true,
    }
  );
};
