import express from 'express';

import { createAdvertisement,
    getAllAdvertisements,
    getAdvertisementById,
    updateAdvertisement,
    deleteAdvertisement,
    createAdvertiser,
    getAllAdvertisers,
    getAdvertiserById,
    updateAdvertiser,
    deleteAdvertiser } from '../controllers/advertisement.controller';

import Authorization from './../../../middlewares/auth';

const router = express.Router();

// Create a new advertiser
router.post('/createAdvertiser/',createAdvertiser);

// Get all advertisers
router.get('/getAllAdvertisers/',getAllAdvertisers);

// Get an advertiser by ID
router.get('/getAdvertiserById/:id',Authorization(['AC']),getAdvertiserById);

// Update an advertiser by ID
router.post('/updateAdvertiser/:id',updateAdvertiser);

// Delete an advertiser by ID
router.post('/deleteAdvertiser/:id',deleteAdvertiser);

// Create a new advertisement
router.post('/createAdvertisement/',Authorization(['AC']),createAdvertisement);

// Get all advertisements
router.get('/getAllAdvertisements/',Authorization(['AC']),getAllAdvertisements);

// Get an advertisement by ID
router.get('/getAdvertisementById/:id',getAdvertisementById);

// Update an advertisement by ID
router.post('/updateAdvertisement/:id',updateAdvertisement);

// Delete an advertisement by ID
router.post('/deleteAdvertisement/:id',deleteAdvertisement);




export default router;
