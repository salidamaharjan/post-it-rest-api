import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../connection";

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare id: number | null;
  declare title: string;
  declare content: string;
  declare clientId: number;
}

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
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "client",
        key: "id",
      },
    },
  },
  {
    sequelize,
    // modelName: "post",
    underscored: true,
    timestamps: true,
    freezeTableName: true,
  }
);

export default Post;
