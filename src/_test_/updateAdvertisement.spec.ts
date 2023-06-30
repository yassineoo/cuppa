/*
const fs = require('fs');
const path = require('path');
const { createReadStream, createWriteStream } = require('fs-extra');
const { promisify } = require('util');
const rimraf = require('rimraf');
const { v4: uuidv4 } = require('uuid');
const stream = require('stream');
const { Op } = require('sequelize');

import Models from './../models/sequelize';
const Annonce = Models.annonce;
const Annonceur = Models.annonceur;

import AdvertisementManagmentService from './../services/advertisement.management/service/advertisement.management';

describe('Advertisement Management Service', () => {
  let advertisementId;
  let videoPath;
  let advertisementManagmentService;
  
  beforeAll(async () => {
    advertisementManagmentService = new AdvertisementManagmentService();
    // Create a new advertisement to update
    const newAdvertisement = await Annonce.create({
      titre_annonce: 'Test Advertisement',
      texte_annonce: 'This is a test advertisement',
      prix_annonce: 100,
      date_annonce: new Date(),
      duree_annonce: 7,
      etat_annonce: true,
      id_annonceur: 1,
      duree_affichage: 30,
      ageMin: 18,
      ageMax: 60,
      path_video: 'test-video.mp4',
      sexeCible: 'F',
    });
    advertisementId = newAdvertisement.id_annonce;
  });
  
  afterAll(async () => {
    // Remove the test video file and the advertisement from the database
    await fs.promises.unlink(videoPath);
    await Annonce.destroy({ where: { id_annonce: advertisementId } });
  });
  
  it('should update an advertisement by ID', async () => {
    const testData = {
      titre_annonce: 'Updated Advertisement',
      texte_annonce: 'This advertisement has been updated',
      prix_annonce: 200,
      duree_annonce: 14,
      etat_annonce: false,
      duree_affichage: 60,
      ageMin: 21,
      ageMax: 50,
      path_video: 'updated-video.mp4',
      sexeCible: 'M',
    };
    
    // Create a test video file to upload
    const testVideoPath = path.join(__dirname, '..', 'fixtures', testData.path_video);
    videoPath = path.join(__dirname, '..', '..', '..', 'uploads', `advertisement${advertisementId}.mp4`);
    await fs.promises.copyFile(testVideoPath, videoPath);
    
    const updatedAdvertisement = await advertisementManagmentService.updateAdvertisement(advertisementId, testData, { filepath: testVideoPath });
    
    expect(updatedAdvertisement).toEqual(jasmine.objectContaining(testData));
    expect(updatedAdvertisement.path_video).toEqual(`advertisement${advertisementId}.mp4`);
  });
})
*/