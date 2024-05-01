import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../connection";

class Like extends Model<InferAttributes<Like>, InferCreationAttributes<Like>> {
  declare id: number | null;
  declare clientId: number;
  declare postId: number;
}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "client",
        key: "id",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "post",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "like",
    underscored: true,
    timestamps: true,
    freezeTableName: true,
  }
);
export default Like;
