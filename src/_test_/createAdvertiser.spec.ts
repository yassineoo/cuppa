
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
    describe('createAdvertiser', () => {
      let service;
  
      beforeEach(() => {
        service = new AdvertisementManagmentService();
      });
  
      afterEach(() => {
        sinon.restore();
      });
  
      it('should create a new advertiser with an image', async () => {
        // Arrange
        const imagePath = path.join(__dirname, 'test-image.png');
        const imageStream = fs.createReadStream(imagePath);
        const data = {
          nom_annonceur: 'Jane Doe',
          email: 'janedoe@example.com',
        };
        const advertiser = {
          id_annonceur: 1,
          nom_annonceur: data.nom_annonceur,
          email: data.email,
          path_annonceur: 'advertiser1.png',
          update: sinon.spy(),
        };
        sinon.stub(Annonceur, 'create').returns(advertiser);
  
        // Act
        const createdAdvertiser = await service.createAdvertiser(data, imageStream);
  
        // Assert
        expect(Annonceur.create).to.have.been.calledWith(data);
        expect(createdAdvertiser).to.deep.equal(advertiser);
        expect(fs.existsSync(path.join(__dirname, '..', '..', '..', 'uploads', createdAdvertiser.path_annonceur))).to.be.true;
        expect(advertiser.update).to.have.been.calledWith({ path_annonceur: 'advertiser1.png' });
      });
  
      it('should create a new advertiser without an image', async () => {
        // Arrange
        const data = {
          nom_annonceur: 'Jane Doe',
          email: 'janedoe@example.com',
        };
        const advertiser = {
          id_annonceur: 1,
          nom_annonceur: data.nom_annonceur,
          email: data.email,
          path_annonceur: null,
          update: sinon.spy(),
        };
        sinon.stub(Annonceur, 'create').returns(advertiser);
  
        // Act
        const createdAdvertiser = await service.createAdvertiser(data);
  
        // Assert
        expect(Annonceur.create).to.have.been.calledWith(data);
        expect(createdAdvertiser).to.deep.equal(advertiser);
        expect(advertiser.update).to.not.have.been.called;
      });
  
      it('should throw an error if the data is invalid', async () => {
        // Arrange
        const data = {
          email: 'janedoe@example.com',
        };
        sinon.stub(Annonceur, 'create').throws(new Error('Invalid data'));
  
        // Act + Assert
        await expectAsync(service.createAdvertiser(data)).toBeRejectedWithError('Invalid data');
      });
    });
  });
  

  */