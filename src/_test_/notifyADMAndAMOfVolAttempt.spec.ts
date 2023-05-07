import NotificationManagementService from './../services/notification.management/service/notification.management';
import Models from './../models/sequelize'

const Utilisateur = Models.utilisateur;
const Role = Models.role;
const Distributeur = Models.distributeur;



//Increasing the timeout interval for Jasmine test suite, because the method notifyADMAndAMOfVolAttempt() takes longer than the specified timeout interval to complete
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;



describe('NotificationManagementService', () => {
  let notificationService: NotificationManagementService;

  beforeEach(() => {
    notificationService = new NotificationManagementService();

  });

  describe('notifyADMAndAMOfVolAttempt', () => {
    let numero_serie_distributeur: string;
    let description: string;
    
    beforeEach(() => {
      numero_serie_distributeur = "1";
      description = 'Tentative de vol détectée.';
    });
  
    it('should send notification to ADM and AM users', async () => {
      // Arrange
      const mockDistributeur = {

        numero_serie_distributeur: "1",
        localisation_statique_distributeur: 'Alger'
      };
      spyOn(Distributeur, 'findOne').and.returnValue(mockDistributeur);
  
      const mockADMRole = {
        id_role: 3,
        libelle_role: 'ADM'
      };
      const mockAMRole = {
        id_role: 5,
        libelle_role: 'AM'
      };
      spyOn(Role, 'findOne').and.returnValues(mockADMRole, mockAMRole);
  
      const mockADMUser = {
        id_utilisateur: 1,
        regestration_token: 'dQieF9YRQR21XiAEtyMdEm:APA91bEHss6hz2NvDkU5j-2BLQSafYVGmEaE-glK0tdhDKi4FQToifl38-UE1i4XoImClPIGRrX0wZUKdvLKCQ-MFW0BQWqh3v02glal9KucfYbmhKBID0VTQBfNjxHT0HAsXkbolrcx'
      };
      const mockAMUser = {
        id_utilisateur: 2,
        regestration_token: 'dQieF9YRQR21XiAEtyMdEm:APA91bEHss6hz2NvDkU5j-2BLQSafYVGmEaE-glK0tdhDKi4FQToifl38-UE1i4XoImClPIGRrX0wZUKdvLKCQ-MFW0BQWqh3v02glal9KucfYbmhKBID0VTQBfNjxHT0HAsXkbolrcx'
      };
      spyOn(Utilisateur, 'findAll').and.returnValues([mockADMUser], [mockAMUser]);
  
      spyOn(notificationService, 'sendNotification').and.returnValue(Promise.resolve());
  
      spyOn(notificationService, 'saveDetectionVol').and.returnValue(Promise.resolve());
  
      // Act
      await notificationService.notifyADMAndAMOfVolAttempt(numero_serie_distributeur, description);
  
      // Assert
      expect(Distributeur.findOne).toHaveBeenCalledWith({ where: { numero_serie_distributeur:numero_serie_distributeur } });
      expect(Role.findOne).toHaveBeenCalledWith({ where: { libelle_role: 'ADM' } });
      expect(Role.findOne).toHaveBeenCalledWith({ where: { libelle_role: 'AM' } });
      expect(Utilisateur.findAll).toHaveBeenCalledWith({ where: { id_role: mockADMRole.id_role } });
      expect(Utilisateur.findAll).toHaveBeenCalledWith({ where: { id_role: mockAMRole.id_role } });
  
      const expectedADMNotification = {
        notification: {
          title: `Tentative de vol sur le distributeur ${mockDistributeur.numero_serie_distributeur}`,
          body: `Le système a détecté une tentative de vol sur le distributeur ${mockDistributeur.numero_serie_distributeur} situé à ${mockDistributeur.localisation_statique_distributeur}.`
        },
        token: mockADMUser.regestration_token
      };
      const expectedAMNotification = {
        notification: {
          title: `Tentative de vol sur le distributeur ${mockDistributeur.numero_serie_distributeur}`,
          body: `Le système a détecté une tentative de vol sur le distributeur ${mockDistributeur.numero_serie_distributeur} situé à ${mockDistributeur.localisation_statique_distributeur}.`
        },
        token: mockAMUser.regestration_token
      };
      expect(notificationService.sendNotification).toHaveBeenCalledWith(expectedADMNotification);
      expect(notificationService.sendNotification).toHaveBeenCalledWith(expectedAMNotification);
  
      expect(notificationService.saveDetectionVol).toHaveBeenCalledWith(numero_serie_distributeur, description);
    });
  });
  
});
