import models from '../../models/sequelize';
import distributeursService from '../../services/service-distributeurs/distributeurs.service';
import distributeursLogic from '../../services/service-distributeurs/distributeurs.logic';
import axios from 'axios';
import { create } from 'domain';
import exp from 'constants';


describe('Service de gestion de distributeurs', () => {

    describe("Recuperer un distributeur par son identifiant", () => {
        it("Retourne un objet distributeur quand elle reçoit un identifiant valide", async () => {
            const id = '1'
            const expectedDistributeur = {id_distributeur : id, numero_serie_distributeur : '3498UR45'}
            const findByPkSpy = spyOn(models.distributeur, 'findByPk').and.returnValue(expectedDistributeur)

            const result = await distributeursService.getByID(id)
            expect(findByPkSpy).toHaveBeenCalledWith(id)
            expect(result).toEqual(expectedDistributeur)
        });

        it("Retourne null si l'identifiant n'est pas valide", async () => {
            const id = '-6'
            const findByPkSpy = spyOn(models.distributeur, 'findByPk').and.returnValue(null)

            const result = await distributeursService.getByID(id)
            expect(findByPkSpy).toHaveBeenCalledWith(id)
            expect(result).toEqual(null)
        })

        it("Retourne un distributeur si seulement s'il appartient au client de l'utilisateur",async () => {
            const id = '1';
            const user_id = 'AM6709';
            const client = 'client8';

            const expectedDistributeur = {id_distributeur : id, numero_serie_distributeur : '3498UR45', id_client : client}


            //mock : user
            spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: { id_client: client } }));

            //mock : distributeur
            spyOn(distributeursService, 'getByID').and.returnValue(Promise.resolve(expectedDistributeur));

            //Appel de la méthode à tester
            const result = await distributeursLogic.getOneByClient(id, user_id);

            //Assertions 
            expect(result).toEqual(expectedDistributeur);
            expect(axios.get).toHaveBeenCalledWith(process.env.URL + `getAccount/${user_id}`);
            expect(distributeursService.getByID).toHaveBeenCalledWith(id);

        })

        it("Retourne null si le distributeur n'appartient pas au même client que l'utilisateur",async () => {
            const id = '1';
            const user_id = 'AM6709';

            const expectedDistributeur = {id_distributeur : id, numero_serie_distributeur : '3498UR45', id_client : "client6"}


            //mock : user
            spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: { id_client: "client24" } }));

            //mock : distributeur
            spyOn(distributeursService, 'getByID').and.returnValue(Promise.resolve(expectedDistributeur));

            //Appel de la méthode à tester
            const result = await distributeursLogic.getOneByClient(id, user_id);

            //Assertions 
            expect(result).toEqual(null);
            expect(axios.get).toHaveBeenCalledWith(process.env.URL + `getAccount/${user_id}`);
            expect(distributeursService.getByID).toHaveBeenCalledWith(id);
        })

    }) 




    describe("Recuperer la liste des distributeurs", () => {
        it("Retourne la liste des distributeurs",async () => {
            
        })

        it("Retourne la liste des distributeurs appartenant au client de l'utilisateur s'il existe",async () => {
            const user_id = 'AM6709';
            const client = 'client8';
            const expectedDistributeurs = [
                { id: '1', id_client: client },
                { id: '2', id_client: client },
                { id: '3', id_client: client }
              ];

            //mocks : 
            spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: { id_client: client } }));
            spyOn(distributeursService, 'getAllByClientID').and.returnValue(Promise.resolve(expectedDistributeurs));

            const result = await distributeursLogic.getAllByClient(user_id);

            expect(result).toEqual(expectedDistributeurs)
            expect(axios.get).toHaveBeenCalledWith(process.env.URL + `getAccount/${user_id}`)
            expect(distributeursService.getAllByClientID).toHaveBeenCalledWith(client);
        })

        it("Retourne une liste vide si aucun distributeur appartient au client de l'utilisateur",async () => {

            const user_id = 'AC340F';
            const client = 'client7';

            //mocks : 
            spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: { id_client: client } }));
            spyOn(distributeursService, 'getAllByClientID').and.returnValue(Promise.resolve([]));

            const result = await distributeursLogic.getAllByClient(user_id);

            expect(result).toEqual([])
            expect(axios.get).toHaveBeenCalledWith(process.env.URL + `getAccount/${user_id}`)
            expect(distributeursService.getAllByClientID).toHaveBeenCalledWith(client);
        })

    
    })


    describe("Creer une nouvelle ressource de type distributeur",() => {
        let Mock
        beforeEach(()=> {
            const exist : string = "1245"
            Mock = spyOn(models.distributeur, 'create').and.callFake((info : any) => {
                if(info.numero_serie_distributeur == exist || !info.numero_serie_distributeur) {
                    return Promise.resolve(null)
                } else {
                    return Promise.resolve({
                        id_distributeur : info.id_distributeur,
                        numero_serie_distributeur : info.numero_serie_distributeur
                      });
                }
            })

        })

        afterEach(()=> {
            models.distributeur.create.calls.reset()
        })



        it("crée un nouveau distributeur et retourne l'objet",async () => {
            const info = {
                id_distributeur : '-2',
                numero_serie_distributeur : '1246'
            }
            const result = await distributeursService.add(info)
            expect(models.distributeur.create).toHaveBeenCalledWith(info);
            expect(result).toBeDefined();
            expect(result).toEqual(info)
        })

        
        it("retourne null si le numero de serie est déjà utilisé",async () => {
            const info = {
                id_distributeur : '-8',
                numero_serie_distributeur : '1245'
            }
            const result = await distributeursService.add(info)
            expect(models.distributeur.create).toHaveBeenCalledWith(info);
            expect(result).toBeDefined();
            expect(result).toEqual(null)

        })

        it("retourne null si aucun numero de serie est fourni",async () => {
             const info = {
                id_distributeur : '-8',
                numero_serie_distributeur : ''
            }
            const result = await distributeursService.add(info)
            expect(models.distributeur.create).toHaveBeenCalledWith(info);
            expect(result).toBeDefined();
            expect(result).toEqual(null)

        })
    })


    describe("Supprimer un distributeur portant l'identifiant id",() => {


        it("Supprime un distributeur s'il exist - method : distributeurLogic.Delete",async () => {
            const id : string = '5'

            const distributeur = {id_distributeur : id, numero_serie_distributeur : '3498UR45', id_client : ""}

            spyOn(distributeursService, 'getByID').and.returnValue(Promise.resolve(distributeur));
            spyOn(distributeursService, 'delete').and.returnValue(Promise.resolve());

            await distributeursLogic.delete(id);
            
            expect(distributeursService.getByID).toHaveBeenCalledWith(id);
            expect(distributeursService.delete).toHaveBeenCalledWith(distributeur);
        })

        it("Lance une erreur si le distributeur n'existe pas- method : distributeurLogic.Delete",async () => {

            const id : string = "-5"
            spyOn(distributeursService, 'getByID').and.returnValue(Promise.resolve(null))

            await expectAsync(distributeursLogic.delete(id)).toBeRejectedWithError(`Distributeur with id ${id} does not exist.`)
            
        })

        it("Lance une erreur si le distributeur est déjà affecté à un client - method : distributeurLogic.Delete",async () => {
            const id : string = '5'

            const distributeur = {id_distributeur : id, numero_serie_distributeur : '3498UR45', id_client : "client_34"}

            spyOn(distributeursService, "getByID").and.returnValue(Promise.resolve(distributeur))
            await expectAsync(distributeursLogic.delete(id)).toBeRejectedWithError(`Failed deletion : Distributeur ${id} already belongs to a client`);
        })

    })

    }
)

