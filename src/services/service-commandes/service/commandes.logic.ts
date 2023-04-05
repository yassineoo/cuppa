
const commandesLogic = {
    translate: (instructions: Map<string, string>): string => {
        let commande : string = "dispense" 
        instructions.forEach((value, key) => {
            commande += " " + key + "?" + value + "$ "
        })

        return commande
    }
}

export default commandesLogic