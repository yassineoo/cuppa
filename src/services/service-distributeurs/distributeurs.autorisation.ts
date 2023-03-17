import { Response, Request, NextFunction } from "express";

interface User {
    id : String,
    role : String[] //a user can have multiple roles
}


const authorize = (roles : String []) => {

    return (req : Request, res : Response, next : NextFunction) => {
    //verifier s'il y a l'autorisation dans l'entete de la requete
    if(!req.headers.authorization) {
        res.status(401).send('La requête nécessite une authentification')
      }
    else {
        const token : String = req.headers.authorization.replace('Bearer', '')
        
    }
}

}
export default authorize