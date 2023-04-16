import sequelize from "../config/sequilize";
import initModels from "./init-models";
const models = initModels(sequelize);
export default models;