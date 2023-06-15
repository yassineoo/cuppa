/*
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const rimraf = require('rimraf');
const { v4: uuidv4 } = require('uuid');
const stream = require('stream');

import Models from './../models/sequelize';
const Annonce = Models.annoce;
const Annonceur = Models.annoceur;

import AdvertisementManagmentService from './../services/advertisement.management/service/advertisement.management';

describe('AdvertisementManagmentService', () => {
    let service;
    
    beforeAll(async () => {
    service = new AdvertisementManagmentService();
    });
    
    afterAll(async () => {
    // clean up the uploads directory after all tests have completed
    const uploadsPath = path.join(__dirname, '..', '..', 'uploads');
    await promisify(rimraf)(uploadsPath);
    });
    
    describe('updateAdvertiser', () => {
    let advertiser;

    beforeEach(async () => {
        // create a new advertiser to use in the test
        advertiser = await Annonceur.create({
          nom: 'Test Advertiser',
          email: 'testadvertiser@example.com',
          telephone: '1234567890'
        });
      });
      
      afterEach(async () => {
        // delete the test advertiser after each test
        await advertiser.destroy();
      });
      
      it('should update the advertiser with the given ID', async () => {
        const newData = {
          nom: 'Updated Name',
          email: 'updatedemail@example.com',
          telephone: '0987654321'
        };
        const imagePath = path.join(__dirname, '..', 'test.png');
        const imageStream = fs.createReadStream(imagePath);
        
        const updatedAdvertiser = await service.updateAdvertiser(advertiser.id_annonceur, newData, imageStream);
        
        expect(updatedAdvertiser.nom).toEqual(newData.nom);
        expect(updatedAdvertiser.email).toEqual(newData.email);
        expect(updatedAdvertiser.telephone).toEqual(newData.telephone);
        
        // check that the image was saved to disk
        const imageFilePath = path.join(__dirname, '..', '..', 'uploads', `advertiser${advertiser.id_annonceur}.png`);
        expect(fs.existsSync(imageFilePath)).toBe(true);
      });
      
      it('should throw an error if the advertiser with the given ID does not exist', async () => {
        const invalidId = uuidv4();
        const newData = {
          nom: 'Updated Name',
          email: 'updatedemail@example.com',
          telephone: '0987654321'
        };
        const imagePath = path.join(__dirname, '..', 'test.png');
        const imageStream = fs.createReadStream(imagePath);
        
        try {
          await service.updateAdvertiser(invalidId, newData, imageStream);
        } catch (error) {
          expect(error.message).toEqual(`Advertiser with id ${invalidId} not found`);
        }
      });
    });
});      

*/