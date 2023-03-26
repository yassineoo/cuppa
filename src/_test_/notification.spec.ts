import NotificationManagementService from './../services/notification.management/service/notification.management';
import Models from './../models/singlton'

const Utilisateur = Models.getUtilisateur();
const Role = Models.getRole();
const Panne = Models.getPanne();
const DetectionVol = Models.getDetectionVol();
const Distributeur = Models.getDistributeur();
const Tache = Models.getTache();


describe('NotificationManagementService', () => {
  let notificationService: NotificationManagementService;

  beforeEach(() => {
    notificationService = new NotificationManagementService();
  });

  describe('notifyADMAndAMOfVolAttempt', () => {
    it('sends email notifications to ADM and AM roles with correct content', async () => {

      spyOn(Distributeur, 'findOne').and.returnValue({
        id_distributeur: 1,
        numero_serie_distributeur: '123',
        localisation_statique_distributeur: 'here',
      });
 
      spyOn(Utilisateur, 'findAll').and.returnValue([
        { mail_utilisateur: 'aissanyris84@gmail.com' },
        { mail_utilisateur: 'js_zitouni@esi.dz' },
      ]);

      // Mock the email sending function
      spyOn(notificationService, 'sendNotification');

      // Call the method being tested
      await notificationService.notifyADMAndAMOfVolAttempt(1, 'description');

      // Check the email sending function was called twice, once for each ADM
      expect(notificationService.sendNotification).toHaveBeenCalledTimes(4);

      // Check the email content for the first ADM
      expect(notificationService.sendNotification).toHaveBeenCalledWith(
        'aissanyris84@gmail.com',
        {
          objet: 'Tentative de vol sur le distributeur 123',
          contenu:
            'Le système a détecté une tentative de vol sur le distributeur 123 situé à here.',
        }
      );

      // Check the email content for the second ADM
      expect(notificationService.sendNotification).toHaveBeenCalledWith(
        'js_zitouni@esi.dz',
        {
          objet: 'Tentative de vol sur le distributeur 123',
          contenu:
            'Le système a détecté une tentative de vol sur le distributeur 123 situé à here.',
        }
      );
    });
  });
});
