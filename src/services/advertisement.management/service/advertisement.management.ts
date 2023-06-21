import Models from './../../../models/sequelize';
const fs = require('fs');
const path = require('path');
//import stream from 'stream';
import { Op } from 'sequelize';
import { createReadStream,createWriteStream } from 'fs';
import axios from 'axios';
import fetch from 'isomorphic-fetch';
//import request from 'request';
//import got from 'got';
//import http from 'http';
import FormData from 'form-data';
import * as faceapi from 'face-api.js';
import { log } from 'console';

// Set fetch implementation to node-fetch
faceapi.env.monkeyPatch({ fetch: fetch});
  
// Initialize the models
const Annonce = Models.annonce;
const Annonceur = Models.annonceur;
const Utilisateur = Models.utilisateur;
const client = Models.client;
   



class AdvertisementManagmentService {

// create an advertiser
async createAdvertiser(data, image, idAC) {
	try {
		console.log(`-----------------------------------`);
		console.log(`data: ${JSON.stringify(data)}`);		
		console.log(`image: ${image}`);		
		console.log(`idAC: ${idAC}`);	
		console.log(`-----------------------------------`);
	  const { ...rest } = data; // destructure the data
  
	  const advertiser = await Annonceur.create(rest);
  
	  // create the uploads folder if it doesn't exist
	  const uploadsPath = path.join(__dirname, '..', '..', '..', 'uploads');
	  if (!fs.existsSync(uploadsPath)) {
		fs.mkdirSync(uploadsPath);
	  }
  
	  // save the image to disk
	  if (image) {
		const imageName = `advertiser${advertiser.id_annonceur}.png`; // use the advertiser ID as the image name
		const imagePath = path.join(uploadsPath, imageName); // specify the path to save the image
  
	//	await fs.promises.rename(image, imagePath);
        console.log(imageName);
		console.log(imagePath);
		
		await advertiser.update({ path_annonceur: imagePath });
	  }
  
	  // Update the utilisateur with idAC
	  await Utilisateur.update({ id_client: rest.id_client }, { where: { id_utilisateur: idAC } });
  
	  return advertiser;
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  }
  
  
// get all advertisers
async getAllAdvertisers() {
			try {


				const annonceurs = await Annonceur.findAll({
					include: [{ model: Annonce ,as:'annonces'  }],
					
				  });
			  
				  const advertisersWithAdsCount = annonceurs.map((annonceur) => {
					const { id_annonceur, nom_annonceur, type_annonceur, path_annonceur,id_client ,telephone_annonceur ,rcs_annonceur,fiscal_annonceur    } = annonceur;
			  
					const numberOfAds = annonceur.annonces.length;
			  
					return {
					  id_annonceur,
					  nom_annonceur,
					  telephone_annonceur ,
					  rcs_annonceur,
					  fiscal_annonceur,
					  type_annonceur,
					  path_annonceur,
					  numberOfAds,
					  id_client
					};
				  });
			  
				  return advertisersWithAdsCount;
			} catch (error) {
			  console.log(error);
			  throw error;
			}
		  }
		
	
		// get an advertiser by id
		async getAdvertiserById(id) {
			try {
				const annonceur = await Annonceur.findOne({
				  where: { id_annonceur: id }
				});
				return annonceur;
			  } catch (error) {
				console.log(error);
				throw error;
			  }
		  }
		
	
		
		  async updateAdvertiser(id, data, image) {
			try {
				log(`-----------------------------------`);
				log(`data: ${JSON.stringify(data)}`);
				log(`image: ${image}`);
				log(`-----------------------------------`);
				
			  const { ...rest } = data;
			  const advertiser = await Annonceur.findOne({ where: { id_annonceur: id } });
			  if (!advertiser) {
				throw new Error(`Advertiser with id ${id} not found`);
			  }
			
			  await advertiser.update(rest);
			
			  // save the image to disk
			  if (image) {
				const imageName = `advertiser${advertiser.id_annonceur}.png`; // use the advertiser ID as the image name
				const imagePath = path.join(__dirname, '..', '..', '..', 'uploads', imageName); // specify the path to save the image
			
				// create a writable stream to write the image to disk
				const imageStream = fs.createWriteStream(imagePath);
			
				// create a readable stream from the image data and pipe it to the writable stream
				const readableImageStream = fs.createReadStream(image);
				readableImageStream.pipe(imageStream);
			
				await new Promise((resolve, reject) => {
				  imageStream.on('finish', resolve);
				  imageStream.on('error', reject);
				});
			console.log('-------------------------------------');

			 console.log(imageName);

			console.log('-------------------------------------');
			
				await advertiser.update({ path_annonceur: imageName });
			  }
			
			  return advertiser.toJSON();
			} catch (error) {
			  console.log(error);
			  throw error;
			}
		  }
		  

  async updateAdvertiserWithoutTheFile (id, data) {
	try {
	  const advertisement = await Annonceur.findOne({ where: { id_annonceur: id } });
	  if (!advertisement) {
		console.log('not found');
		throw new Error(`Advertiser with id ${id} not found`);
		
	  }
	  console.log(data);
	  
	  const advertisement2 = await Annonceur.update(data,{ where: { id_annonceur: id } });
  

	  // Update the advertisement
	//  const updatedAdvertisement = { ...advertisement.toJSON(), ...data };
	  // Update the advertisement
	  const updatedAdvertisement = { ...advertisement.toJSON(), ...data };
	  await advertisement.update(updatedAdvertisement);
  
	  return advertisement.toJSON();
  
	
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  }
  
		
         // Delete an advertiser by ID
    async deleteAdvertiser(id) {
	try {
	  const advertiser = await Annonceur.findOne({ where: { id_annonceur: id } });
	  if (!advertiser) {
		throw new Error(`Advertiser with id ${id} not found`);
	  }
  
	  const imagePath = advertiser.path_annonceur;
	  await fs.promises.unlink(`src\\uploads\\${imagePath}`); // delete the image file
  
	  await advertiser.destroy(); // delete the advertiser from the database
  
	  return { message: `Advertiser with id ${id} deleted successfully` };
	} catch (error) {
	  console.log(error);
	  throw error;
	}
    }
  



 // Create an advertisement
async createAdvertisement(data) {
	try {
	  const {
		id_annonceur,
		duree_affichage,
		ageMin,
		ageMax,
		sexe_cible,
		tarif_annonce,
		nom_annonce,
		type,
		etat_annonce,
		date_debut,
		nombre_affichage,
		path_video
	  } = data;
  
	  const advertiser = await Annonceur.findOne({ where: { id_annonceur } });
	  if (!advertiser) {
		throw new Error(`Advertiser with id ${id_annonceur} not found`);
	  }


	    // save the uploaded video file to the uploads directory
		const uploadsPath = path.join(__dirname, '..', '..', '..', 'uploads');
		if (!fs.existsSync(uploadsPath)) {
		  fs.mkdirSync(uploadsPath);
		}
  
		// generate the new video file name using the auto-incremented ID of the Annonce instance
		const advertisement = await Annonce.create({
			id_annonceur,
			duree_affichage,
			ageMin,
			ageMax,
			sexe_cible,
			tarif_annonce,
			nom_annonce,
			type,
			etat_annonce,
			date_debut,
			nombre_affichage,
			path_video
		  });
	
		const videoName = `advertisement${advertisement.id_annonce}.mp4`;
  
		const videoPath = path.join(uploadsPath, videoName);
		console.log(videoName);
  
		// Saving the video to the server
		await createReadStream(data.videoFile.filepath).pipe(createWriteStream(videoPath));
  
		// add the video path to the advertisement data
		//const dataWithVideo = { id_annonceur, duree_affichage, ageMin, ageMax, sexeCible, prix_annonce, path_video: videoName };
  
	

  	  await advertisement.update({...advertisement.toJSON() ,path_video: videoName});
	  return advertisement;
	} catch (error) {
	  console.error(error);
	  throw error;
	}
  }



   // Get all advertisements
   async getAllAdvertisements() {
	try {
	  const advertisements = await Annonce.findAll({
		include: [{ model: Annonceur ,as:'id_annonceur_annonceur' }]
	  });
	  return advertisements;
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  } 

  
  // Get all advertisements for a user
  async getAllAdvertisementsByUser(userId) {
	try {
	  const utilisateur = await Utilisateur.findByPk(userId);
	  if (!utilisateur) {
		throw new Error(`User with id ${userId} not found`);
	  }
  
	  const annonces = await Annonce.findAll({
		include: [
		  {
			model: Annonceur,
			where: { id_client: utilisateur.id_client }
		  }
		]
	  });
  
	  return annonces;
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  }
  
  
  // Get an advertisement by ID
  async getAdvertisementById(id) {
	try {
	  const advertisement = await Annonce.findOne({
		where: { id_annonce: id },
		include: [{ model: Annonceur }]
	  });
	  return advertisement;
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  }
  
  
  // Update an advertisement by ID
   // Update an advertisement by ID
   async updateAdvertisement(id, data, videoFile) {
	try {
	  const advertisement = await Annonce.findOne({ where: { id_annonce: id } });
	  if (!advertisement) {
		throw new Error(`Advertisement with id ${id} not found`);
	  }
  
	  // Save the uploaded video file to the uploads directory
	  const uploadsPath = path.join(__dirname, '..', '..', '..', 'uploads');
	  if (!fs.existsSync(uploadsPath)) {
		fs.mkdirSync(uploadsPath);
	  }
	  const videoName = `advertisement${id}.mp4`;
	  const videoPath = path.join(uploadsPath, videoName);
	  await createReadStream(videoFile.filepath).pipe(createWriteStream(videoPath));
  
	  // Add the video path to the advertisement data
	  const dataWithVideo = { ...data, path_video: videoName };
  
	  // Update the advertisement
	  const updatedAdvertisement = { ...advertisement.toJSON(), ...dataWithVideo };
	  await advertisement.update(updatedAdvertisement);
  
	  return advertisement.toJSON();
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  }



    // Update an advertisement by ID
	async updateAdvertisementWithoutTheFile (id, data) {
		try {
		  const advertisement = await Annonce.findOne({ where: { id_annonce: id } });
		  if (!advertisement) {
			console.log('not found');
			throw new Error(`Advertisement with id ${id} not found`);
			
		  }
		  console.log(data);
		  
		  const advertisement2 = await Annonce.update(data,{ where: { id_annonce: id } });
	  
	
		  // Update the advertisement
		//  const updatedAdvertisement = { ...advertisement.toJSON(), ...data };
		  // Update the advertisement
		  const updatedAdvertisement = { ...advertisement.toJSON(), ...data };
		  await advertisement.update(updatedAdvertisement);
	  
		  return advertisement.toJSON();
	  
		
		} catch (error) {
		  console.log(error);
		  throw error;
		}
	  }


  // Delete an advertisement by ID
  async deleteAdvertisement(id) {
	try {
	  const advertisement = await Annonce.findOne({ where: { id_annonce: id } });
	  if (!advertisement) {
		throw new Error(`Advertisement with id ${id} not found`);
	  }
  
	  await advertisement.destroy();
  
	  return { message: `Advertisement with id ${id} deleted successfully` };
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  }  

  
// Function to predict age and gender using face-recognition library

async predictAgeAndGender(imagePath) {
	try {
	  const imageData = await fs.promises.readFile(imagePath);
  
	  const formData = new FormData();
	  formData.append('image', imageData, 'image.png');
  
	  const response = await axios.post('https://detectionmodel.onrender.com/predict', formData, {
		headers: {
			'Host': 'detectionmodel.onrender.com',
	        'Content-Type': 'multipart/form-data',
	        'Content-Length': imageData.length.toString(),
		},
	  });
  
	  const { age, gender } = response.data;
	  return { age, gender };
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  }


  /*
  async loadImage(imagePath: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
	  const imageElement = document.createElement('img');
	  imageElement.onload = () => resolve(imageElement);
	  imageElement.onerror = reject;
	  imageElement.src = imagePath;
	});
  }
  */




  // Function to select an appropriate advertisement based on age and gender
  async selectAdvertisement(age, gender) {
	const whereCondition = {
	  ageMin: { [Op.lte]: age },
	  ageMax: { [Op.gte]: age },
	  sexe_cible: gender,
	};
  
	const advertisement = await Annonce.findOne({ where: whereCondition });
	return advertisement;
  }
  

  // Get all advertisements for an advertiser
   async getAllAdvertisementsByAdvertiser(advertiserId) {
	try {
	  const advertiser = await Annonceur.findByPk(advertiserId);
	  if (!advertiser) {
		throw new Error(`Advertiser with id ${advertiserId} not found`);
	  }
	
	  const advertisements = await Annonce.findAll({
		where: { id_annonceur: advertiser.id_annonceur },
		include: [{ model: Annonceur }]
	  });
	
	  return advertisements;
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  }

  


  // Get the total price of all advertisements for an advertiser
   async getTotalPriceByAdvertiser(advertiserId) {
	try {
	  const advertiser = await Annonceur.findByPk(advertiserId);
	  if (!advertiser) {
		throw new Error(`Advertiser with id ${advertiserId} not found`);
	  }
  
	  const advertisements = await Annonce.findAll({
		where: { id_annonceur: advertiser.id_annonceur }
	  });
  
	  let totalPrice = 0;
  
	  for (const advertisement of advertisements) {
		if (advertisement.type === 'duree') {
		  totalPrice += advertisement.duree_affichage * advertisement.tarif_annonce;
		} else if (advertisement.type === 'vues') {
		  totalPrice += advertisement.nombre_affichage * advertisement.tarif_annonce;
		}
	  }
  
	  return totalPrice;
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  }



  // Get all advertisers for a user
async getAllAdvertisersByUser(userId) {
	try {
	  const utilisateur = await Utilisateur.findByPk(userId);
	  if (!utilisateur) {
		throw new Error(`User with id ${userId} not found`);
	  }
  
	  const annonceurs = await Annonceur.findAll({
		include: [
		  {
			model: client,
			where: { id_client: utilisateur.id_client },
		  },
		],
	  });
  
	  return annonceurs;
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  }
  
}


  
export default AdvertisementManagmentService;