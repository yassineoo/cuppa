import express from 'express';
import { createAccount, deleteAccount,getEmployees, modifyAccount,getAccounts,getProfil,createClientAccount, createConsommateurAccount, getAllClients, getClientByID, getUtilisateurByClientID, getProfilWithClient } from '../controllers/account.controller';
import Authorization from './../middlewares/auth';

const router = express.Router();


/**

@route POST api/getAccounts
@desc get All Accounts
@access Admin
*/
router.get('/getAccounts/:role',Authorization(['ADM']), getAccounts);

/**

@route POST api/createAccount
@desc Create a new Account
@access Admin
*/
router.post('/createAccount/:role',Authorization(['ADM','SADM']), createAccount);
/**

@route DELETE api/deleteAccount/:id
@desc Delete a Account by id
@access Admin
*/
router.post('/deleteAccount/:role/:id',Authorization(['ADM','SADM']), deleteAccount);
/**

@route PUT api/modifyAccount/:id
@desc Modify a Account by id
@access Admin
*/
router.put('/modifyAccount/:role/:id',Authorization(['ADM','AC','AM','decideur']), modifyAccount);


/**

@route POST api/getProfil
@desc get profil
*/
router.get('/getProfil/',Authorization(['SADM','ADM','AC','AM','decideur']),getProfil);

/**
@route POST api/createClientAccount
@desc Create a new client account
@access SADM
*/
router.post('/createClientAccount/',Authorization(['SADM']), createClientAccount);


/**
@route POST api/createConsommateurAccount
@desc Create a new consommateur account
*/
router.post('/createConsommateurAccount/', createConsommateurAccount);


/**
@route GET api/getAllClients
@desc Get all clients
@access AC
*/
router.get('/getAllClients',Authorization(['SADM']), getAllClients);

/**
@route GET api/getClientByID/:id
@desc Get a client by ID
@access AC
*/
router.get('/getClientByID/:id', Authorization(['SADM']), getClientByID);

/**
@route GET api/getUtilisateurByClientID/:clientID
@desc Get utilisateurs by client ID
@access AC
*/
router.get('/getUtilisateurByClientID/:clientID', Authorization(['SADM']), getUtilisateurByClientID);


/**
 * @route GET api/getProfilWithClient/:userID
 * @desc Get the profile with client information
 * @access SADM, ADM, AC, AM, decideur
 */
router.get('/getProfileWithClient', Authorization(['SADM', 'ADM', 'AC', 'AM', 'decideur']), getProfilWithClient);


/**
 * @route GET api/getProfilWithClient/:userID
 * @desc Get the profile with client information
 * @access SADM, ADM, AC, AM, decideur
 */
router.get('/getEmployees', Authorization([ 'ADM']), getEmployees);


export default router;