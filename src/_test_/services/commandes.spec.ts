import models from "../../models/sequelize"
import commandesService from "../../services/service-commandes/service/commandes.service"

describe('Service de gestion des commandes ', () => {
    
    describe("ajouter une commande", () => {
        it("crée une nouvelle commande et retourne son identifiant",async () => {
            const info = {
                    time_cmd : "2020-02-03T12:09:00",
                    prix_cmd : 30,
                    quantite_sucre : 1,
                    taille_goblet : 1,
                    id_boisson : 2,
                    numero_serie_distributeur : "2390FE"
            }

            //mock
            spyOn(models.commande, 'create').and.callFake((info : any) => {
                    return Promise.resolve({
                        id_cmd : 4,
                        
                      });
                }
            )
            const result = await commandesService.add(info)
            expect(models.commande.create).toHaveBeenCalledWith(info);
            expect(result).toBeDefined();
            expect(result).toEqual(4) 

        })
    })

    describe("recuperer une commande a partir de son identifiant", () => {
        it("retourne les informations d'une commande",async () => {
            const commande = {
                id_cmd: 23,
                time_cmd: "2019-07-26T11:08:00.000Z",
                prix_cmd: "40",
                quantite_sucre: 2,
                taille_goblet: 1,
                etat_cmd: "payée",
                id_boisson: 1,
                id_consommateur: null,
                numero_serie_distributeur: "34E89R4U"
            }

            spyOn(models.commande, 'findByPk').and.callFake((id : number) => {
                return Promise.resolve(commande);
            })

            const result = await commandesService.getByID(commande.id_cmd.toString())
            expect(models.commande.findByPk).toHaveBeenCalledWith(commande.id_cmd);
            expect(result).toBeDefined();
            expect(result).toEqual(commande) 
        })
    })

    describe("", ()=> {
        
    })

    
})
