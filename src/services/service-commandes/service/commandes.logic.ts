
const commandesLogic = {
    translate: (instructions: Map<string, string>, sucre : string, size : string): string[] => {
        let commandes : string[] = [];
        commandes.push("start");
        //preparation instructions 
        let cmd : string = "PREPARE " + size;
        instructions.forEach((value, key) => {
            cmd += " add " + key + " " + value 
        })

        cmd += " dispense sugar " + sucre;

        commandes.push(cmd);
        commandes.push("stop")

        return commandes
    }

};

export default commandesLogic;