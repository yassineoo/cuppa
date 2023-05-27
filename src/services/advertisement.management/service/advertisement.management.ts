import Models from './../../../models/sequelize';
const fs = require('fs');
const path = require('path');
import stream from 'stream';

import { createReadStream,createWriteStream } from 'fs';




  
// Initialize the models
const Annonce = Models.annonce;
const Annonceur = Models.annonceur;
   

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
        console.log(imageName);
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


				const annonceurs = await Annonceur.findAll({
					include: [{ model: Annonce ,as:'annoces'  }],
					
				  });
			  
				  const advertisersWithAdsCount = annonceurs.map((annonceur) => {
					const { id_annonceur, nom_annonceur, prenom_annonceur, type_annonceur, path_annonceur } = annonceur;
			  
					const numberOfAds = annonceur.annoces.length;
			  
					return {
					  id_annonceur,
					  nom_annonceur,
					  prenom_annonceur,
					  type_annonceur,
					  path_annonceur,
					  numberOfAds,
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
	  await fs.promises.unlink(`src\\uploads\\${imagePath}`); // delete the image file
  
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
		nom_annonce ,
		ageMax,
		sexeCible,
		prix_annonce,
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
	  const annonce = await Annonce.create({ id_annonceur,nom_annonce , duree_affichage, ageMin, ageMax, sexeCible, prix_annonce });
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
	  let videoPath;
	  if (videoFile) {
		const uploadsPath = path.join(__dirname, '..', '..', '..', 'uploads');
		if (!fs.existsSync(uploadsPath)) {
		  fs.mkdirSync(uploadsPath);
		}
		const videoName = `advertisement${id}.mp4`;
		videoPath = path.join(uploadsPath, videoName);
		await createReadStream(videoFile.filepath).pipe(createWriteStream(videoPath));
  
		// Add the video path to the advertisement data
		data.path_video = videoPath;
	  }
  
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
	  
	  // get the video file path and delete the file
	  const videoPath = advertisement.getDataValue('path_video');
	  if (videoPath) {
		await fs.unlinkSync(`src\\uploads\\${videoPath}`);
	  }
  
	  await advertisement.destroy();
	  return { message: `Advertisement with id ${id} deleted successfully` };
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  }


}


  
export default AdvertisementManagmentService;