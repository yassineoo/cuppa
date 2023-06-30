import express from 'express';

import { createAdvertisement,
    getAllAdvertisements,
    getAdvertisementById,
    updateAdvertisement,
    updateAdvertisementWithoutTheFile,
    deleteAdvertisement,
    createAdvertiser,
    getAllAdvertisers,
    getAdvertiserById,
    updateAdvertiser,
    updateAdvertiserWithoutTheFile,
    deleteAdvertiser,
    handleImageUpload, 
    getAllAdvertisementsByUser,
    getAllAdvertisementsByAdvertiser,
    getTotalPriceByAdvertiser,
    getAllAdvertisersByUser } from '../controllers/advertisement.controller';

import Authorization from './../../../middlewares/auth';

const router = express.Router();

// Create a new advertiser
router.post('/createAdvertiser/',Authorization(['AC']),createAdvertiser);

// Get all advertisers
router.get('/getAllAdvertisers/',Authorization(['AC']),getAllAdvertisers);

// Get an advertiser by ID
router.get('/getAdvertiserById/:id',Authorization(['AC']),getAdvertiserById);

// Update an advertiser by ID
router.post('/updateAdvertiser/:id',Authorization(['AC']),updateAdvertiser);

// Delete an advertiser by ID
router.post('/deleteAdvertiser/:id',Authorization(['AC']),deleteAdvertiser);

// Create a new advertisement
router.post('/createAdvertisement/',Authorization(['AC']),createAdvertisement);

// Get all advertisements
router.get('/getAllAdvertisements/',Authorization(['AC']),getAllAdvertisements);

// Get all advertisements for a user
router.get('/getAllAdvertisementsByUser/',Authorization(['AC']),getAllAdvertisementsByUser);

// Get an advertisement by ID
router.get('/getAdvertisementById/:id',getAdvertisementById);

// Update an advertisement by ID
router.put('/updateAdvertisement/:id',updateAdvertisement);

// Update an advertisement by ID
router.post('/updateAdvertisementWithoutTheFile/:id',updateAdvertisementWithoutTheFile);
// Update an advertisement by ID
router.post('/updateAdvertiserWithoutTheFile/:id',updateAdvertiserWithoutTheFile);



// Delete an advertisement by ID
router.post('/deleteAdvertisement/:id',Authorization(['AC']),deleteAdvertisement);

// Handle image upload
router.post('/handleImageUpload',Authorization(['AC']),handleImageUpload);

// Get all advertisements for an advertiser
router.get('/getAllAdvertisementsByAdvertiser/:advertiserId',Authorization(['AC']),getAllAdvertisementsByAdvertiser)


// Get the total price of all advertisements for an advertiser
router.get('/getTotalPriceByAdvertiser/:advertiserId', getTotalPriceByAdvertiser);

// Get all advertisers for a user
router.get('/getAllAdvertisersByUser/', Authorization(['AC']), getAllAdvertisersByUser);


export default router;
