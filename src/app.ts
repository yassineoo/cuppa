import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import  loginRoute from './services/authService/routes/auth.Route'
import bodyParser from 'body-parser';
// Create express instance to setup API
//import ExpressLoader from  './loaders/Express' ;
//new ExpressLoader();


dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/login',loginRoute);
app.get('/',(req,res) => {
	res.send('koko')
})



app.listen(PORT, () => {
  
	console.log(`Application started on this port ${PORT}!`);

});




