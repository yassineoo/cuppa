/*
const fs = require('fs');
const path = require('path');

import Models from './../models/sequelize';
const Annonce = Models.annoce;
const Annonceur = Models.annonceur;

import AdvertisementManagmentService from './../services/advertisement.management/service/advertisement.management';

describe('createAdvertisement', () => {
  let data:any;
  let advertiser:any;
  let readStreamSpy:any;
  let writeStreamSpy:any;
  let createReadStream:any;
  let createWriteStream:any;
  let advertisementManagementService = new AdvertisementManagmentService();

  beforeEach(() => {
    data = {
      id_annonceur: 1,
      duree_affichage: '60',
      ageMin: 18,
      ageMax: 40,
      sexeCible: 'F',
      prix_annonce: 100.00,
      path_video: "video test",
      videoFile: {
        filepath: 'C:/Users/X13/Pictures/Camera Roll/WIN_20230510_20_31_58_Pro.mp4'
      }
    };
    advertiser = {
      id_annonceur: 1,
      nom_annonceur: 'Zitouni',
      prenom_annonceur: 'Syrine',
      path_annonceur: 'C:/Users/X13/Pictures/abonnement.png',
      sexe_annonceur: 'F'
    };
    readStreamSpy = jasmine.createSpy('createReadStream').and.returnValue({
      pipe: (ws: any) => {
        ws.write('test');
        ws.end();
      }
    });
    writeStreamSpy = jasmine.createSpy('createWriteStream');
    createReadStream = jasmine.createSpy('fs.createReadStream').and.returnValue(readStreamSpy);
    createWriteStream = jasmine.createSpy('fs.createWriteStream').and.returnValue(writeStreamSpy);
    spyOn(Annonce, 'create').and.returnValue(Promise.resolve({ id_annonce: 1 }));
    spyOn(fs, 'existsSync').and.returnValue(false);
    spyOn(fs, 'mkdirSync');
    advertisementManagementService = new AdvertisementManagmentService(); // instantiate the class
  });

  it('should create advertisement successfully', async () => {
    //spyOn(Annonceur, 'findAll').and.returnValue(Promise.resolve([advertiser]));
    
    const result = await advertisementManagementService.createAdvertisement(data); // call the method on the instance
    
    // Assert
    //expect(Annonceur.findAll).toHaveBeenCalledWith({ where: { id_annonceur: data.id_annonceur } });
    expect(Annonce.create).toHaveBeenCalledWith({
      id_annonceur: data.id_annonceur,
      duree_affichage: data.duree_affichage,
      ageMin: data.ageMin,
      ageMax: data.ageMax,
      sexeCible: data.sexeCible,
      prix_annonce: data.prix_annonce,
      path_video:  "video test"
    });
    expect(fs.existsSync).toHaveBeenCalledWith(path.join(__dirname, '..', '..', '..', 'uploads'));
    expect(fs.mkdirSync).toHaveBeenCalledWith(path.join(__dirname, '..', '..', '..', 'uploads'));
    expect(Annonce.create).toHaveBeenCalled();
    expect(createReadStream).toHaveBeenCalledWith(data.videoFile.filepath);
    expect(createWriteStream).toHaveBeenCalledWith(path.join(__dirname, '..', '..', '..', 'uploads', `advertisement1.mp4`));
    expect(readStreamSpy.pipe).toHaveBeenCalled();
    expect(result).toEqual({ id_annonce: 1 });
  });
});
*/