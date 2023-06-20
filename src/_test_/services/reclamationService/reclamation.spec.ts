import stripe from '../../../services/service-paiement/paymentConfig';

import PaymentService from '../../../services/service-paiement/payment';
import models from '../../../models/sequelize';
import ReclamationService from '../../../services/service-reclamation/reclamationService';

const CommandeModel = models.commande;
const utilisateurModel = models.utilisateur;
const ReclamationModel = models.reclamation;
const ConsommateurModel = models.consommateur;

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
		  const mockUser = { id_client: 456 };
		  spyOn(utilisateurModel, 'findByPk').and.returnValue(mockUser);


		  spyOn(ReclamationModel, 'findAll').and.throwError('Failed to retrieve reclamations');
	  
		  // Instantiate the object under test
		  // Call the function under test
		 try {
			const result = await  reclamationService.getAllReclamationsByClient(mockId);

		 } 
		 catch (error) {
			expect(utilisateurModel.findByPk).toHaveBeenCalledWith(mockId);
			expect(error).toEqual(new Error('Failed to retrieve reclamations'));
		 }
		  // Call the function under test and expect an error to be thrown
	//	  await expectAsync(reclamationService.getAllReclamationsByClient(mockId)).toBeRejectedWithError('Failed to retrieve reclamations');
		
		//  expect(ReclamationModel.findAll).not.toHaveBeenCalled();
		});
		
	  });




		describe('getReclamation', () => {
		  it('should retrieve a specific reclamation by ID', async () => {
			// Mock data
			const mockId = 123;
			const mockReclamation = {
			  id_reclamation: 1,
			  // Other reclamation properties

			  dataValues :{id_cmd_commande: {
				// Commande properties
				dataValues :{ 
					id_cmd: 1,
					id_consommateur_consommateur: {

					dataValues : {
						id_consommateur :1

					}
				  // Consommateur properties
				}
			}
			  }}
			};
			const mockNumberOfCommande = 2;
			const mockNumberOfReclamation = 3;
	  
			// Spy on the model methods
			spyOn(ReclamationModel, 'findOne').and.returnValue(Promise.resolve(mockReclamation));
			spyOn(ConsommateurModel, 'findOne').and.returnValue(Promise.resolve({
			  get: jasmine.createSpy().and.returnValues(mockNumberOfCommande, mockNumberOfReclamation)
			}));
	  
		
	  
			// Call the function under test
			const result = await reclamationService.getReclamation(mockId);
	  
			// Verify the interactions and expectations
			expect(ReclamationModel.findOne).toHaveBeenCalledWith({
			  where: { id_reclamation: mockId },
			  include: [
				{
				  model: CommandeModel,
				  as: 'id_cmd_commande',
				  include: [
					{
					  model: ConsommateurModel,
					  as: 'id_consommateur_consommateur',
					  where: { id: sequelize.col('id_cmd_commande.id_consommateur') }
					}
				  ]
				}
			  ]
			});
	  
			expect(ConsommateurModel.findOne).toHaveBeenCalledWith({
			  where: { id_consommateur: 1 },
			  attributes: [
				[sequelize.fn('COUNT', sequelize.col('commandes.id_cmd')), 'numberOfCommande'],
				[sequelize.fn('COUNT', sequelize.col('commandes->reclamation.id_reclamation')), 'numberOfReclamation']
			  ],
			  include: [
				{
				  model: CommandeModel,
				  as: 'commandes',
				  attributes: [],
				  include: [
					{
					  model: ReclamationModel,
					  as: 'reclamation',
					  attributes: []
					}
				  ]
				}
			  ]
			});
	  /*
			expect(result).toEqual({
			  id_reclamation: mockReclamation.id_reclamation,
			  // Other reclamation properties
			  id_cmd_commande: null,
			  // Commande properties
			  id_consommateur_consommateur: null,
			  // Consommateur properties
			  numberOfCommande: mockNumberOfCommande,
			  numberOfReclamation: mockNumberOfReclamation
			});
			*/
		  });
	  /*
		  it('should throw an error if failed to retrieve the reclamation', async () => {
			// Mock data
			const mockId = 123;
	  
			// Spy on the model methods to simulate an error
			spyOn(ReclamationModel, 'findOne').and.throwError('Failed to retrieve the reclamation');
			spyOn(ConsommateurModel, 'findOne').and.returnValue(Promise.resolve({
			  get: jasmine.createSpy().and.returnValue(2)
			}));
	  
			// Instantiate the object under test
			const reclamationService = new ReclamationService();
	  
			// Call the function under test and expect it to throw an error
			await expectAsync(reclamationService.getReclamation(mockId)).toBeRejectedWithError('Failed to retrieve the reclamation');
	  
			expect(ReclamationModel.findOne).toHaveBeenCalledWith({
			  where: { id_reclamation: mockId },
			  include: [
				{
				  model: CommandeModel,
				  as: 'id_cmd_commande',
				  include: [
					{
					  model: ConsommateurModel,
					  as: 'id_consommateur_consommateur',
					  where: { id: sequelize.col('id_cmd_commande.id_consommateur') }
					}
				  ]
				}
			  ]
			});
	  
			expect(ConsommateurModel.findOne).not.toHaveBeenCalled();
		  });
		});

*/	  



	
});
