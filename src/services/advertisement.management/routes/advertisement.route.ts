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
router.put('/updateAdvertiser/:id',Authorization(['AC']),updateAdvertiser);

// Delete an advertiser by ID
router.delete('/deleteAdvertiser/:id',Authorization(['AC']),deleteAdvertiser);

// Create a new advertisement
router.post('/createAdvertisement/',createAdvertisement);

// Get all advertisements
router.get('/getAllAdvertisements/',Authorization(['AC']),getAllAdvertisements);

// Get an advertisement by ID
router.get('/getAdvertisementById/:id',Authorization(['AC']),getAdvertisementById);

// Update an advertisement by ID
router.put('/updateAdvertisement/:id',Authorization(['AC']),updateAdvertisement);

// Delete an advertisement by ID
router.delete('/deleteAdvertisement/:id',Authorization(['AC']),deleteAdvertisement);


export default router;
