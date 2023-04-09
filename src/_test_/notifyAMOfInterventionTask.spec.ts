import NotificationManagementService from './../services/notification.management/service/notification.management';
import Models from './../models/singlton'

const Utilisateur = Models.getUtilisateur();
const Role = Models.getRole();
const Distributeur = Models.getDistributeur();




//Increasing the timeout interval for Jasmine test suite, because the method notifyAMOfInterventionTask() takes longer than the specified timeout interval to complete
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;



describe('NotificationManagementService', () => {
  let notificationService: NotificationManagementService;

  beforeEach(() => {
    notificationService = new NotificationManagementService();

  });

  describe('notifyAMOfInterventionTask', () => {
    let distributeurId: number;
    let description: string;
    
    beforeEach(() => {
      distributeurId = 1;
      description = "Tache pour l'AM";
    });
  
    it('should send notification to AM users', async () => {
      // Arrange
      const mockDistributeur = {
        id_distributeur: distributeurId,
        numero_serie_distributeur: 'abc',
        localisation_statique_distributeur: 'Alger'
      };
      spyOn(Distributeur, 'findOne').and.returnValue(mockDistributeur);
  
      const mockAMRole = {
        id_role: 5,
        libelle_role: 'AM'
      };
      spyOn(Role, 'findOne').and.returnValues(mockAMRole);
  
      
      const mockAMUser = {
        id_utilisateur: 2,
        registration_token: 'dQieF9YRQR21XiAEtyMdEm:APA91bEHss6hz2NvDkU5j-2BLQSafYVGmEaE-glK0tdhDKi4FQToifl38-UE1i4XoImClPIGRrX0wZUKdvLKCQ-MFW0BQWqh3v02glal9KucfYbmhKBID0VTQBfNjxHT0HAsXkbolrcx'
      };
      spyOn(Utilisateur, 'findAll').and.returnValues([mockAMUser]);
  
      spyOn(notificationService, 'sendNotification').and.returnValue(Promise.resolve());
  
      spyOn(notificationService, 'saveInterventionTask').and.returnValue(Promise.resolve());
  
      // Act
      await notificationService.notifyAMOfInterventionTask(distributeurId, description);
  
      // Assert
      expect(Distributeur.findOne).toHaveBeenCalledWith({ where: { id_distributeur: distributeurId } });
      expect(Role.findOne).toHaveBeenCalledWith({ where: { libelle_role: 'AM' } });
      expect(Utilisateur.findAll).toHaveBeenCalledWith({ where: { id_role: mockAMRole.id_role } });
  
     
      const expectedAMNotification = {
        notification: {
          title: `Intervention requise sur le distributeur ${mockDistributeur.numero_serie_distributeur}`,
          body : `Le système a détecté une anomalie sur le distributeur ${mockDistributeur.numero_serie_distributeur} situé à ${mockDistributeur.localisation_statique_distributeur}. Description de l'anomalie : ${description}. Veuillez intervenir pour dépanner le distributeur.`,
        },
        token: mockAMUser.registration_token
      };
  
      expect(notificationService.sendNotification).toHaveBeenCalledWith(expectedAMNotification);
  
      expect(notificationService.saveInterventionTask).toHaveBeenCalledWith(distributeurId, description);
    });
  });
  
});
