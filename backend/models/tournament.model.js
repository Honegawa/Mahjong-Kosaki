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
      startDate: {
        type: DataType.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataType.DATE,
        allowNull: false,
      },
      entryFee: {
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
