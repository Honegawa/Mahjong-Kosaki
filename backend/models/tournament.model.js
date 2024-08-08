export default (sequelize, DataType) => {
  sequelize.define(
    "Tournament",
    {
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      description: {
        type: DataType.TEXT,
        allowNull: false,
      },
      setup: {
        type: DataType.TEXT,
        allowNull: false,
      },
      startDate: {
        type: DataType.DATE,
        allowNull: false,
        validate: {
          isBeforeEndDate(value) {
            if (
              new Date(value).getTime() >= new Date(this.endDate).getTime()
            ) {
              throw new Error("startDate must be before endDate.");
            }
          },
        },
      },
      endDate: {
        type: DataType.DATE,
        allowNull: false,
      },
      entryFee: {
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
      },
      registerLimitDate: {
        type: DataType.DATE,
        allowNull: false,
        validate: {
          isBeforeStartDate(value) {
            if (
              new Date(value).getTime() >= new Date(this.startDate).getTime()
            ) {
              throw new Error("registerLimitDate must be before startDate.");
            }
          },
        },
      },
      playerLimit: {
        type: DataType.TINYINT,
        allowNull: false,
        validate: {
          min: 8,
        },
      },
      location: {
        type: DataType.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
