import models from '../../models/sequelize';
import distributeursService from '../../services/service-distributeurs/distributeurs.service';
import distributeursLogic from '../../services/service-distributeurs/distributeurs.logic';
import axios from 'axios';


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

    }
)

