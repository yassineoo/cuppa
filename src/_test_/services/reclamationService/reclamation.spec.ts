import stripe from '../../../services/service-paiement/paymentConfig';

import PaymentService from '../../../services/service-paiement/payment';
import models from '../../../models/sequelize';
import ReclamationService from '../../../services/service-reclamation/reclamationService';

const Consommateur = models.consommateur;
const Client = models.client;
const CommandeModel = models.commande;
const DistributeurModel = models.distributeur;
const ClientModel = models.client;
const utilisateurModel = models.utilisateur;
const ReclamationModel = models.reclamation;
import sequelize from 'sequelize';

const reclamationService = new ReclamationService();
describe('Reclamation Service', () => {
	describe('getAllReclamationsByClient', () => {
		it('should retrieve reclamations for a given client ID', async () => {
		  // Mock data
		  const mockId = 123;
		  const mockUser = { id_client: 456 };
		  const mockReclamations = [{ id: 1, description: 'Reclamation 1' }, { id: 2, description: 'Reclamation 2' }];
		
		  spyOn(utilisateurModel, 'findByPk').and.returnValue(mockUser);
		  // Mock models and functions
		  spyOn(ReclamationModel, 'findAll').and.returnValue(mockReclamations);
		  spyOn(sequelize, 'col').and.returnValue(2 as any);
	
	  
		  // Instantiate the object under test
	
	  
		  // Call the function under test
		  const result = await  reclamationService.getAllReclamationsByClient(mockId);
	  
		  // Verify the interactions and expectations
		  expect(utilisateurModel.findByPk).toHaveBeenCalledWith(mockId);
		  expect(ReclamationModel.findAll).toHaveBeenCalled();
		  expect(result).toEqual(mockReclamations);
		});
	  
		it('should throw an error if failed to retrieve reclamations', async () => {
		  // Mock data
		  const mockId = 123;
		  spyOn(utilisateurModel, 'findByPk').and.returnValue('Failed to retrieve reclamations');
	  
	  
		  // Instantiate the object under test
		  // Call the function under test
		  const result = await  reclamationService.getAllReclamationsByClient(mockId);
	  
	  
		  // Call the function under test and expect an error to be thrown
		  await expectAsync(reclamationService.getAllReclamationsByClient(mockId)).toBeRejectedWithError('Failed to retrieve reclamations');
		  expect(utilisateurModel.findByPk).toHaveBeenCalledWith(mockId);
		//  expect(ReclamationModel.findAll).not.toHaveBeenCalled();
		});
		
	  });
});
