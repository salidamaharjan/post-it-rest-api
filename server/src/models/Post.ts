import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "post",
    underscored: true,
    timestamps: true,
    freezeTableName: true,
  }
);

export default Post;
