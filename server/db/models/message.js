const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Spot }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Spot, { foreignKey: 'spotId' });
    }
  }
  Message.init(
    {
      text: DataTypes.TEXT,
      spotId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Message',
    },
  );
  return Message;
};
