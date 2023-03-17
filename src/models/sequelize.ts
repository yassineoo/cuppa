import { Sequelize} from "sequelize";
import initModels from "./init-models";

const sequelize = new Sequelize('smartbev', 'bouchra', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const models = initModels(sequelize);

export default models