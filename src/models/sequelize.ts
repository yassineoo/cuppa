import { Sequelize} from "sequelize";
import initModels from "./init-models";

const sequelize = new Sequelize('db_projet_2cs', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const models = initModels(sequelize);

export default models