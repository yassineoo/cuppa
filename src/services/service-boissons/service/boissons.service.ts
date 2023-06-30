
import { Sequelize } from "sequelize";
import models from "../../../models/sequelize";

type BoissonModel = typeof models.boisson


export class BoissonsService {
  static async getAll(): Promise<BoissonModel[]> {
    const drinks : BoissonModel[] = await models.boisson.findAll();
    return drinks;
  }

  static async getAllWithIng(): Promise<BoissonModel[]> {
    const drinks: BoissonModel[] = await models.boisson.findAll();
  
    // Fetching ingredients for each boisson
    for (const drink of drinks) {
      const ingredients: BoissonModel[] = await models.outils_preparation_boisson.findAll({
        include: [
          {
            model: models.preperer_avec,
            where: { id_boisson: drink.id_boisson },
            
          }
        ]
      });
  
      // Extracting ingredient names
      const ingredientNames: string[] = ingredients.map(ingredient => ingredient.preparer_avec.ingredient.nom);
  
      // Adding ingredient names as a new attribute to the boisson
      drink.ingredients = ingredientNames;
    }
  
    return drinks;
  }
  
  static async getAllIngrediants(): Promise<BoissonModel[]> {
    const ingrediants : BoissonModel[] = await models.outils_preparation_boisson.findAll();
    return ingrediants;
  }

  static async getById(id: number) {
    return models.boisson.findByPk(id);
  }

  static async deleteById(id: number): Promise<boolean> {
  try {
    // Supprimer toutes les lignes de la table boisson_ing liées à la boisson
    await models.boisson_ing.destroy({ where: { id_boisson: id } });
    // Supprimer la boisson
    await models.boisson.destroy({ where: { id_boisson: id } });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}


static async create(boissonData: any, imagePath?: string): Promise<any> {
  const { duree_preparation_boisson, libelle_boisson, description_boisson, prix_boisson, id_client, path_image_boisson, ingredients } = boissonData;

  try {
    const boisson: BoissonModel = await models.boisson.create({
      duree_preparation_boisson,
      libelle_boisson,
      description_boisson,
      prix_boisson,
      id_client,
      path_image_boisson: imagePath
    });

   
    const parsedIngredients = JSON.parse(ingredients);
  
    const boissonIngs = parsedIngredients.map((ingredient: any) => ({
      id_boisson: boisson.id_boisson,
      id_outil: ingredient.id_outil,
      quantite_preparation: ingredient.quantite_preparation
    }));

    await models.boisson_ing.bulkCreate(boissonIngs);
    return boisson.id_boisson;
  } catch (error) {
    console.error(error);
    return false;
  }
}



static async update(id: number, boissonData: any, imagePath?: string): Promise<any> {
  const { duree_preparation_boisson, libelle_boisson, description_boisson, prix_boisson, id_client, path_image_boisson, ingredients } = boissonData;

  try {
    const boisson = await models.boisson.findByPk(id);

    if (!boisson) {
      throw new Error('La boisson spécifiée est introuvable');
    }

    await boisson.update({
      duree_preparation_boisson,
      libelle_boisson,
      description_boisson,
      prix_boisson,
      id_client,
      path_image_boisson: imagePath// use the imagePath parameter for the image path
    });

    const parsedIngredients = JSON.parse(ingredients);
  
    const newIngredients = parsedIngredients.map((ingredient: any) => ({
      id_boisson: boisson.id_boisson,
      id_outil: ingredient.id_outil,
      quantite_preparation: ingredient.quantite_preparation
    }));

    await models.boisson_ing.destroy({ where: { id_boisson: id } });
    await models.boisson_ing.bulkCreate(newIngredients);

    return boisson;
  } catch (error) {
    console.error(error);
    throw new Error('Une erreur est survenue lors de la modification de la boisson');
  }
}

  

  
}



  


