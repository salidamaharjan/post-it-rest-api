import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../connection";

class Client extends Model<
  InferAttributes<Client>,
  InferCreationAttributes<Client>
> {
  declare id: number | null;
  declare username: string;
  declare password: string;
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "client",
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
    underscored: true,
    timestamps: true,
    freezeTableName: true,
  }
);

export default Client;
