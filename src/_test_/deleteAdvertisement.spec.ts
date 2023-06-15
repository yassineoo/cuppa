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

describe('Advertisement Management Service', () => {
  describe('deleteAdvertisement', () => {

    let existing_advertisement_ID = 1;
    let non_existing_advertisement_ID = 6;
    let advertisementManagmentService = new AdvertisementManagmentService();



    //Trying to delete a non existing advertisement

    it('should throw an error if the advertisement is not found', async () => {
      const id = non_existing_advertisement_ID;
      try {
        // call the deleteAdvertisement method with a non-existing ID which is 6
        await advertisementManagmentService.deleteAdvertisement(id);
      } catch (error) {
        // check that the error message contains the correct ID
        expect(error.message).toContain(`Advertisement with id ${id} not found`);
      }
    });



    //Trying to delete an existing advertisement

    it('should return a message if the advertisement is deleted successfully', async () => {
      
      // get the id of the existing adevertisement which is 29
      const id = existing_advertisement_ID;
    
      // delete the advertisement by id
      const result = await advertisementManagmentService.deleteAdvertisement(id);
    
      // assert that the advertisement was deleted successfully
      expect(result.message).toEqual(`Advertisement with id ${id} deleted successfully`);
    });
    
  });
});
*/


