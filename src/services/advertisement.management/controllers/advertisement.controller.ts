/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response } from 'express';

import AdvertisementManagmentService from './../service/advertisement.management';

import { IncomingForm } from 'formidable';




const advertisementService = new AdvertisementManagmentService();


// Advertiser controllers

export const createAdvertiser = async (req: Request, res: Response) => {
	try {
	  const form = new IncomingForm({
		multiples: false,
		keepExtensions: true,
		uploadDir: process.env.UPLOAD_DIR,
		type: 'multipart',
		parse: (req, options, callback) => {
		  // use the default parser
		  return IncomingForm.prototype.parse.call(this, req, options, callback);
		}
	  });
  
	  form.parse(req, async (err, fields, files) => {
		if (err) {
		  console.error(err);
		  throw err;
		}
  
		const { ...data } = fields; // destructure the fields
		const image = files.image.filepath; // get the path to the image file
		const advertiser = await advertisementService.createAdvertiser(data, image);
  
		res.status(201).json(advertiser);
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ error: 'Internal server error' });
	}
  };
  

export const getAllAdvertisers = async (req: Request, res: Response) => {
	try {
	  const advertisers = await advertisementService.getAllAdvertisers();
	  
	  res.status(200).json(advertisers);
	} catch (error) {
	  console.log(error);
	  res.status(500).json({ message: 'Failed to retrieve advertisers' });
	}
  };
  
  export const getAdvertiserById = async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	try {
	  const advertiser = await advertisementService.getAdvertiserById(id);
	  if (advertiser) {
		res.status(200).json(advertiser);
	  } else {
		res.status(404).json({ message: 'Advertiser not found' });
	  }
	} catch (error) {
	  console.log(error);
	  res.status(500).json({ message: 'Failed to retrieve advertiser' });
	}
  };
  

  export const updateAdvertiser = async (req: Request, res: Response) => {
	try {
	  const form = new IncomingForm({
		multiples: false,
		keepExtensions: true,
		uploadDir: process.env.UPLOAD_DIR,
		type: 'multipart',
		parse: (req, options, callback) => {
		  // use the default parser
		  return IncomingForm.prototype.parse.call(this, req, options, callback);
		}
	  });
  
	  form.parse(req, async (err, fields, files) => {
		if (err) {
		  console.error(err);
		  throw err;
		}
  
		const { ...data } = fields; // destructure the fields
		const image = files.image ? files.image.filepath : null; // get the path to the image file
		const id = parseInt(req.params.id);
		const advertiser = await advertisementService.updateAdvertiser(id, data, image);
  
		res.status(200).json(advertiser);
	  });
	} catch (error) {
	  //console.error(error);
	  res.status(500).send({ error: 'Internal server error' });
	}
  };
  
  
  export const deleteAdvertiser = async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	try {
	  const result = await advertisementService.deleteAdvertiser(id);
	  res.status(200).json({ success: true, message: result.message });
	} catch (error) {
	  console.log(error);
	  res.status(500).json({ success: false, error: 'Failed to delete advertiser' });
	}
  };


  export const createAdvertisement = async (req: Request, res: Response) => {
	try {
		const form = new IncomingForm({
			multiples: true,
			keepExtensions: true,
			uploadDir: process.env.UPLOAD_DIR,
			type: 'multipart',
			parse: (req, options, callback) => {
			   //use the default parser
			   return IncomingForm.prototype.parse.call(this, req, options, callback);
			}
		 });
		 
  
	  form.parse(req, async (err, fields, files) => {
		if (err) {
		  console.error(err);
		  throw err;
		}
  
		const data = { ...fields, videoFile: files.videoFile };
		//console.log(data.videoFile.filepath);
		const advertisement = await advertisementService.createAdvertisement(data);
  
		res.status(201).json(advertisement);
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ error: 'Internal server error' });
	}
  };

export const getAllAdvertisements = async (req: Request, res: Response) => {
  try {
    const annonces = await advertisementService.getAllAdvertisements();
    res.status(200).json(annonces);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to retrieve advertisements' });
  }
};

export const getAdvertisementById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const annonce = await advertisementService.getAdvertisementById(id);
    if (annonce) {
      res.status(200).json(annonce);
    } else {
      res.status(404).json({ message: 'Advertisement not found' });
	}
	
} catch (error) {
	console.log(error);
	res.status(500).json({ message: 'Failed to retrieve advertisement' });
	}
	
};
	
 
 export const updateAdvertisement = async (req: Request, res: Response) => {
	try {
	  const { id } = req.params;
	  const form = new IncomingForm({
		multiples: true,
		keepExtensions: true,
		uploadDir: process.env.UPLOAD_DIR,
		type: 'multipart',
		parse: (req, options, callback) => {
		  //use the default parser
		  return IncomingForm.prototype.parse.call(this, req, options, callback);
		}
	  });
  
	  form.parse(req, async (err, fields, files) => {
		if (err) {
		  console.error(err);
		  throw err;
		}
  
		const data = { ...fields, videoFile: files.videoFile };
		const updatedAdvertisement = await advertisementService.updateAdvertisement(id, data, files.videoFile);
  
		res.status(200).json(updatedAdvertisement);
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ error: 'Internal server error' });
	}
  };
  
  
	
	export const deleteAdvertisement = async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	try {
		const result = await advertisementService.deleteAdvertisement(id);
		res.status(200).json({ success: true, message: result.message });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, error: 'Failed to delete advertisement' });
	}
	};