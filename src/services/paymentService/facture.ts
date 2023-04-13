
import singleton from '../../models/singleton';
import path from 'path';

// Get the root directory path
const Consommateur = singleton.getConsommateur();
const Client = singleton.getClient();
const Paiement = singleton.getPaiement();

import PDFDocument from 'pdfkit';
import fs from 'fs';


class Facture {

	static create = (name,Description,Price,currency) => {
		
		try {
			const doc = new PDFDocument();
			doc.text('Facture ', { align: 'center' });
			doc.moveDown();

			doc.text('Facture number: 12345', { align: 'left' });
			doc.text(`Date: ${Date.now()}`, { align: 'left' });
			doc.moveDown();

			doc.text(`name : ${name }`, { align: 'left' });
			doc.text(`Description : ${Description}`, { align: 'left' });
			doc.text(`Price : ${Price} `, { align: 'left' });
			doc.text(`Currency : ${currency} `, { align: 'left' });
			doc.moveDown();

			doc.moveDown();
			const facturePath = path.join(__dirname, '../../../factures/invoice.pdf');
			console.log(facturePath);
		
			doc.pipe(fs.createWriteStream(facturePath));
			doc.end();
			return facturePath;
		} catch (err) {
			console.error(err);
		// handle the error appropriately (e.g. return an error message, throw an error, etc.)
		}
	};
}

export default Facture;
// sa3a conflict + facture 