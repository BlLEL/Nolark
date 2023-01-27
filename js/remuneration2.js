/**
 * Fonction qui retourne la prime d'ancienneté
 * @param {integer} nb
 * @returns {float}
 */

function recupPrimeAnciennete(nb) {
    const prime = 300;
    const nbAncienMin = 4;
    const bonus = 30;
    
    if (nb < nbAncienMin){
        return 0;
    }
    else {
        return prime + bonus*(nb - nbAncienMin);
    }
}

function recupPrimeDistance(nb) {
    const prix = 0.01, plafond = 900;
    let indem = nb * prix;
    if (indem > plafond) {
        return plafond;
    } else {
        return indem;
    }
}




/*function reductionPrime(nbAccident, primeFinal){
    if (nbAccident === 0) {
        return primeFinal;
    }
    else if (nbAccident === 1) {
        return primeFinal / 2; 
    }
    else if (nbAccident === 2){
        return primeFinal / 3; 
    }
    else if (nbAccident === 3){
        return primeFinal / 4; 
    }
    else {
        return 0.0;
    }
}*/

function reduction(primeTotale, nbAccident){
    const premAcc = 0.5;
    const deuxAcc = 0.33;
    const troisAcc = 0.25;
    const quatAcc = 0.0;
    
    if(nbAccident === 0){
        return primeTotale;
    }else if(nbAccident === 1){
        return primeTotale*premAcc;
    }else if(nbAccident === 2){
        return primeTotale*deuxAcc;
    }else if(nbAccident === 3){
        return primeTotale*troisAcc;
    }else {
        return quatAcc;
    }    
}

function calculFinal() {
    // Déclaration des constantes
    const fixe = 1500.0;
    // Déclaration et affectation des variables
    let nbAncien = recupValeur("#num_ancien");
    let km = recupValeur("#num_km");
    let nbAcc = recupValeur("#num_Accident");
    let remuneration = fixe + reduction(recupPrimeAnciennete(nbAncien) + recupPrimeDistance(km), nbAcc) ;
    // Affichage du résultat
    afficheRemu(remuneration);
}

window.addEventListener("load", function () {
    // Déclaration de l'index de parcours
    let i;
    // tabInputs est une collection de <input>
    let tabInputs = window.document.querySelectorAll("input");
    // Parcours de tabInputs en s'appuyant sur le nombre de <input>
    for (i = 0; i < tabInputs.length; i++) {
        // Ajout d'un Listener sur tous les <input> sur l'évènement onKeyUp
        tabInputs[i].addEventListener("click", calculFinal);
    }
});

function recupValeur(id) {
    return parseInt(window.document.querySelector(id).value);
}

function afficheRemu(nombre) {
    window.document.querySelector("#remuneration").innerHTML = "La rémunération sera de : " + nombre + " €";
}

