import initModels from "./init-models";
import sequelize from "../config/sequelizer";

const models = initModels(sequelize);

export default models