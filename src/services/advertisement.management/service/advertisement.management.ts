import Models from './../../../models/sequelize';
const fs = require('fs');
const path = require('path');
import stream from 'stream';
import { Op } from 'sequelize';
import { createReadStream,createWriteStream } from 'fs';
import axios from 'axios';
import fetch from 'isomorphic-fetch';
import request from 'request';
import got from 'got';
import http from 'http';
import FormData from 'form-data';
import * as faceapi from 'face-api.js';

// Set fetch implementation to node-fetch
faceapi.env.monkeyPatch({ fetch: fetch});
  
// Initialize the models
const Annonce = Models.annoce;
const Annonceur = Models.annoceur;
   

// Define the association between the models
Annonce.belongsTo(Annonceur, { foreignKey: 'id_annonceur' });

class AdvertisementManagmentService {

// create an advertiser
async createAdvertiser(data, image) {
	try {
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
  
		await fs.promises.rename(image, imagePath);
  
		await advertiser.update({ path_annonceur: imageName });
	  }
  
	  return advertiser;
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  }
  
  
	  
		// get all advertisers
		async getAllAdvertisers() {
			try {
			  const annonceurs = await Annonceur.findAll();
			  return annonceurs;
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
		
	
		
	// update an advertiser by id
async updateAdvertiser(id, data, image) {
	try {
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
	
		await advertiser.update({ path_annonceur: imageName });
	  }
	
	  return advertiser.toJSON();
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
	  await fs.promises.unlink(imagePath); // delete the image file
  
	  await advertiser.destroy(); // delete the advertiser from the database
  
	  return { message: `Advertiser with id ${id} deleted successfully` };
	} catch (error) {
	  console.log(error);
	  throw error;
	}
    }
  



 // createAdvertisement method
 async createAdvertisement(data) {
	try {
	  const {
		id_annonceur,
		duree_affichage,
		ageMin,
		ageMax,
		sexeCible,
		prix_annonce,
		path_video,
		videoFile
	  } = data;
  
	  const advertiser = await Annonceur.findOne({ where: { id_annonceur } });
	  if (!advertiser) {
		throw new Error(`Annonceur with id ${id_annonceur} not found`);
	  }
  
	  // save the uploaded video file to the uploads directory
	  const uploadsPath = path.join(__dirname, '..', '..', '..', 'uploads');
	  if (!fs.existsSync(uploadsPath)) {
		fs.mkdirSync(uploadsPath);
	  }
  
	  // generate the new video file name using the auto-incremented ID of the Annonce instance
	  const annonce = await Annonce.create({ id_annonceur, duree_affichage, ageMin, ageMax, sexeCible, prix_annonce, path_video });
	  const videoName = `advertisement${annonce.id_annonce}.mp4`;
  
	  const videoPath = path.join(uploadsPath, videoName);
	  console.log(videoName);
  
	  // Saving the video to the server
	  await createReadStream(videoFile.filepath).pipe(createWriteStream(videoPath));
  
	  // add the video path to the advertisement data
	  const dataWithVideo = { id_annonceur, duree_affichage, ageMin, ageMax, sexeCible, prix_annonce, path_video: videoName };
  
	  await annonce.update(dataWithVideo);
	  return annonce;
	} catch (error) {
	  console.error(error);
	  throw error;
	}
  };
  
	  
  
  
  

  // get all advertisements
  async getAllAdvertisements() {
    try {
      const annonces = await Annonce.findAll({
        include: [{ model: Annonceur }],
      });
      return annonces;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // get an advertisement by id
  async getAdvertisementById(id) {
    try {
      const annonce = await Annonce.findOne({
        where: { id_annonce: id },
        include: [{ model: Annonceur }],
      });
      return annonce;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

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
  
  

 // Delete an advertisement by ID
 async deleteAdvertisement(id) {
	try {
	  const advertisement = await Annonce.findOne({ where: { id_annonce: id } });
	  if (!advertisement) {
		throw new Error(`Advertisement with id ${id} not found`);
	  }
	  
	  // get the video file path and delete the file
	  const videoPath = advertisement.getDataValue('path_video');
	  if (videoPath) {
		fs.unlinkSync(videoPath);
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
	  sexeCible: gender,
	};
  
	const advertisement = await Annonce.findOne({ where: whereCondition });
	return advertisement;
  }
  

}


  
export default AdvertisementManagmentService;