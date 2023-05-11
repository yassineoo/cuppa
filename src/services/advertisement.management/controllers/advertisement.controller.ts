/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response } from 'express';

import AdvertisementManagmentService from './../service/advertisement.management';

import multer from 'multer';

// Set storage engine for multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
	  cb(null, `${Date.now()}_${file.originalname}`);
	},
  });


const advertisementService = new AdvertisementManagmentService();



export const createAdvertiser = async (req: Request, res: Response) => {
	try {

	  //Here is an example of how to create an advertiser
	  /*
	  const base64Image = "AAAAHGZ0eXBhdmlmAAAAAGF2aWZta........";
	  req.body = {
		nom_annonceur:"Zitouni"	,prenom_annonceur:"Assia"	,sexe_annonceur:"F", image: `data:image/png;base64,${base64Image}`
	  }
	  */

	  const advertiser = await advertisementService.createAdvertiser(req.body);
	  res.status(201).json(advertiser);
	} catch (error) {
	  console.log(error);
	  res.status(500).json({ message: 'Failed to create advertiser' });
	}
};

// Advertiser controllers

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
	const id = parseInt(req.params.id);
	
	req.body = {
		prenom_annonceur:"Syrine"
	  }
	try {
	  const updatedAdvertiser = await advertisementService.updateAdvertiser(
		id,
		req.body
	  );
	  res.status(200).json(updatedAdvertiser);
	} catch (error) {
	  console.log(error);
	  res.status(500).json({ message: 'Failed to update advertiser' });
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

// Init multer upload
const upload = multer({ storage: storage }).single("video");

export const createAdvertisement = async (req: Request, res: Response) => {
	try {
		upload(req, res, async (err) => {
		  if (err) {
			console.log(err);
			return res.status(400).send({ error: "Error uploading file" });
		  }
	
		  const data = req.body;
	
		  const annonce = await createAdvertisement(data, (req as any).file);
	
		  return res.status(201).send({ annonce });
		});
	  } catch (error) {
		console.log(error);
		return res.status(500).send({ error: "Internal Server Error" });
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
	const id = parseInt(req.params.id);
	try {
	const updatedAdvertisement = await advertisementService.updateAdvertisement(
	id,
	req.body,
	(req as any).file
	);
	res.status(200).json(updatedAdvertisement);
	} catch (error) {
	console.log(error);
	res.status(500).json({ message: 'Failed to update advertisement' });
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