import Models from './../../../models/sequelize';
const fs = require('fs');
const path = require('path');

import multer from 'multer';




  
// Initialize the models
const Annonce = Models.annoce;
const Annonceur = Models.annoceur;


// Define the association between the models
Annonce.belongsTo(Annonceur, { foreignKey: 'id_annonceur' });

class AdvertisementManagmentService {

	 // create an advertiser
	 async createAdvertiser(data) {
		try {
		  const { image, ...rest } = data; // destructure the image from the data
		  const advertiser = await Annonceur.create(rest);
	  
		  // create the uploads folder if it doesn't exist
		  const uploadsPath = path.join(__dirname, '..', '..', '..', 'uploads');
		  if (!fs.existsSync(uploadsPath)) {
			fs.mkdirSync(uploadsPath);
		  }
	  
		  // save the image to disk
		  if (image) {
			const base64Image = image.split(';base64,').pop(); // remove the data:image/png;base64 prefix
			const imageName = `${advertiser.id_annonceur}.png`; // use the advertiser ID as the image name
			const imagePath = path.join(uploadsPath, imageName); // specify the path to save the image
			await fs.promises.writeFile(imagePath, base64Image, { encoding: 'base64' });
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
			  const advertisers = await Annonceur.findAll();
			  const advertisersWithImages = await Promise.all(advertisers.map(async advertiser => {
				const imagePath = path.join(__dirname, '..', '..', '..', 'uploads', advertiser.path_annonceur);
				const imageBuffer = await fs.promises.readFile(imagePath);
				
				return {
				  id_annonceur: advertiser.id_annonceur,
				  nom_annonceur: advertiser.nom_annonceur,
				  prenom_annonceur: advertiser.prenom_annonceur,
				  sexe_annonceur: advertiser.sexe_annonceur,
				  path_annonceur: advertiser.path_annonceur,
				  image: `data:image/png;base64,${imageBuffer.toString('base64')}`
				};
			  }));
		
			  return advertisersWithImages;
			} catch (error) {
			  console.log(error);
			  throw error;
			}
		}
		
	
		// get an advertiser by id
		async getAdvertiserById(id) {
			try {
			  const advertiser = await Annonceur.findByPk(id);
			  if (!advertiser) {
				throw new Error('Advertiser not found');
			  }
		
			  const imagePath = path.join(__dirname, '..', '..', '..', 'uploads', advertiser.path_annonceur);
			  const imageBuffer = await fs.promises.readFile(imagePath);
		
			  return {
				id_annonceur: advertiser.id_annonceur,
				nom_annonceur: advertiser.nom_annonceur,
				prenom_annonceur: advertiser.prenom_annonceur,
				sexe_annonceur: advertiser.sexe_annonceur,
				path_annonceur: advertiser.path_annonceur,
				image: `data:image/png;base64,${imageBuffer.toString('base64')}`
			  };
			} catch (error) {
			  console.log(error);
			  throw error;
			}
		  }
		
	
		
		// update an advertiser by id
		async updateAdvertiser(id, data) {
			try {
			  const { image, ...rest } = data;
			  const advertiser = await Annonceur.findOne({ where: { id_annonceur: id } });
			  if (!advertiser) {
				throw new Error(`Advertiser with id ${id} not found`);
			  }
		  
			  await advertiser.update(rest);
		  
			  if (image) {
				const base64Image = image.split(';base64,').pop();
				const imageName = `${advertiser.id_annonceur}.png`;
				const imagePath = path.join(__dirname, '..', '..', '..', 'uploads', imageName);
				await fs.promises.writeFile(imagePath, base64Image, { encoding: 'base64' });
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
  
	  const imagePath = path.join(__dirname, '..', '..', '..', 'uploads', advertiser.path_annonceur);
	  await fs.promises.unlink(imagePath); // delete the image file
  
	  await advertiser.destroy(); // delete the advertiser from the database
  
	  return { message: `Advertiser with id ${id} deleted successfully` };
	} catch (error) {
	  console.log(error);
	  throw error;
	}
    }
  



   // create a new advertisement
   async createAdvertisement(data, videoFile) {
	try {
	  const { id_annonceur } = data;
	  const advertiser = await Annonceur.findOne({ where: { id_annonceur } });
	  if (!advertiser) {
		throw new Error(`Annonceur with id ${id_annonceur} not found`);
	  }
  
	  // save the uploaded video file to the uploads directory
	  const videoPath = videoFile.path;
  
	  // add the video path to the advertisement data
	  const dataWithVideo = { ...data, path_video: videoPath };
  
	  const annonce = await Annonce.create(dataWithVideo);
	  return annonce;
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  }
  

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
	  // save the uploaded video file to the uploads directory
     const videoPath = videoFile.path;

     // add the video path to the advertisement data
     const dataWithVideo = { ...data, path_video: videoPath };

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


}


  
export default AdvertisementManagmentService;