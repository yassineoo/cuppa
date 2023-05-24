/*
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const rimraf = require('rimraf');
const { v4: uuidv4 } = require('uuid');
const stream = require('stream');
const { Op } = require('sequelize');
import Models from './../models/sequelize';
const Annonce = Models.annoce;
const Annonceur = Models.annoceur;

import AdvertisementManagmentService from './../services/advertisement.management/service/advertisement.management';

describe('Advertisement Management Service', () => {
    let service;
  
    beforeAll(() => {
      service = new AdvertisementManagmentService();
    });
  
    afterAll(async () => {
      // Remove test data created during the tests
      await Annonce.destroy({ where: { id_annonce: { [Op.gte]: 1000 } } });
      await Annonceur.destroy({ where: { id_annonceur: { [Op.gte]: 1000 } } });
      rimraf.sync(path.join(__dirname, '..', '..', '..', 'uploads', 'advertiser_test.png'));
    });
  
    describe('deleteAdvertiser', () => {
      it('should delete an advertiser by ID', async () => {
        // Create a test advertiser
        const advertiser = await Annonceur.create({
          nom_annonceur: 'Test Advertiser',
          email_annonceur: 'testadvertiser@example.com',
          path_annonceur: 'advertiser_test.png'
        });
  
        const id = advertiser.id_annonceur;
  
        // Call the method being tested
        const result = await service.deleteAdvertiser(id);
  
        // Assert that the result is as expected
        expect(result).toEqual({ message: `Advertiser with id ${id} deleted successfully` });
  
        // Assert that the advertiser has been deleted from the database
        const deletedAdvertiser = await Annonceur.findOne({ where: { id_annonceur: id } });
        expect(deletedAdvertiser).toBeNull();
  
        // Assert that the image has been deleted from disk
        const imagePath = path.join(__dirname, '..', '..', '..', 'uploads', 'advertiser_test.png');
        const imageExists = fs.existsSync(imagePath);
        expect(imageExists).toBe(false);
      });
  
      it('should throw an error if advertiser is not found', async () => {
        // Call the method being tested with an ID that doesn't exist
        const id = 999;
        const promise = service.deleteAdvertiser(id);
  
        // Assert that the method throws an error
        await expectAsync(promise).toBeRejectedWithError(`Advertiser with id ${id} not found`);
      });
    });
  });
*/