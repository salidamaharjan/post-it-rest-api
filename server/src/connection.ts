import dotenv from 'dotenv';
dotenv.config();
import { Sequelize} from "sequelize";

export const sequelize = new Sequelize(process.env.DB_URL!,{
    hooks: {
        beforeDefine: function (columns, model) {
          model.tableName = 'post_it_' + model.name?.plural;
        }
    }
});

