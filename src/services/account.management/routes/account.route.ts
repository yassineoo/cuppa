import express from 'express';
import { createAccount, deleteAccount, modifyAccount,getAccounts,getProfil } from '../controllers/account.controller';
import Authorization from './../middlewares/auth';

const router = express.Router();


/**

@route POST api/getAccounts
@desc get All Accounts
@access Admin
*/
router.get('/getAccounts/:role',Authorization(['adm']), getAccounts);

/**

@route POST api/createAccount
@desc Create a new Account
@access Admin
*/
router.post('/createAccount/:role',Authorization(['adm','sadm']), createAccount);
/**

@route DELETE api/deleteAccount/:id
@desc Delete a Account by id
@access Admin
*/
router.delete('/deleteAccount/:role/:id',Authorization(['adm','sadm']), deleteAccount);
/**

@route PUT api/modifyAccount/:id
@desc Modify a Account by id
@access Admin
*/
router.put('/modifyAccount/:id',Authorization(['adm','ac','am','decideur']), modifyAccount);


/**

@route POST api/getProfil
@desc get profil
*/
router.get('/getProfil/',getProfil);

export default router;