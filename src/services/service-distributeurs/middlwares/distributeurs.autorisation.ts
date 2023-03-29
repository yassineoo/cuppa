import { Response, Request, NextFunction } from "express";
import jwt, { Secret } from 'jsonwebtoken'

interface User {
    id : string,
    role : string //a user can have multiple roles
}

//extend the interface of Request to be able to pass the user id to the controller
declare module 'express' {
    export interface Request {
        user? : User;
    }
}


const authorize = (roles : String []) => {

    return async (req : Request, res : Response, next : NextFunction) => {
    //verifier s'il y a l'autorisation dans l'entete de la requete
    console.log("\n \n ", req.headers.authorization);
    try {
        if(!req.headers.authorization) {
            res.status(401).send('La requête nécessite une authentification')
          }
        else {
            const token : string = req.headers.authorization.replace('Bearer ', '')
            
            const decoded = jwt.verify(token, "hi" as Secret) as User
            //console.log("TOKEN DEECODED : \n", decoded)
            if(!roles.includes(decoded.role)) {
                res.status(403).send('L’utilisateur n’est pas autorisé')
            }
    
            //check id if it's not SADM
            if(decoded.role != "SADM") {
                console.log(decoded.role)
                //pass the id to the controller (the client id needs to be checked before retrieving the list)
                req.user = {id: decoded.id, role : decoded.role};
            }
            next()
        }
    } catch(err: any){
        return res.status(403).send('L’utilisateur n’est pas autorisé');
    }
    
}

}
export default authorize