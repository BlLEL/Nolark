/**
 * Fonction qui retourne la prime d'ancienneté
 * @param {integer} nb
 * @param {float} fixe
 * @returns {float}
 */

function recupPrimeAnciennete(nb, fixe) {
    const prime = 300;
    const nbAncienMin = 4;
    const bonus = 30;
    
    if (nb < nbAncienMin){
        return fixe;
    }
    else {
        return fixe + prime + bonus*(nb - nbAncienMin);
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

function primeFinal(recupPrimeDistance,recupPrimeAnciennete){
    return recupPrimeAnciennete + recupPrimeDistance;
}


function reductionPrime(nbAccident, primeFinal){
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
}

function calculFinal() {
    // Déclaration des constantes
    const fixe = 1500.0;
    // Déclaration et affectation des variables
    let nbAncien = recupValeur("#num_ancien");
    let km = recupValeur("#num_km");
    let nbAcc = recupValeur("#num_Accident");
    let remuneration = fixe + reductionPrime(nbAcc, primeFinal(km,nbAncien)) ;
    // Affichage du résultat
    afficheRemu(remuneration);
}

window.addEventListener("load", function () {

    window.document.querySelector("#btn_calculer").addEventListener("click", function () {
        // Déclaration des constantes
        const fixe = 1500.0;

        // Déclaration et affectation des variables
        let nbAncien = parseInt(window.document.querySelector("#num_ancien").value);
        let km = parseInt(window.document.querySelector("#num_km").value);
        let nbAcc = parseInt(window.document.querySelector("#num_Accident").value);
        let remuneration = fixe + reductionPrime(nbAcc, primeFinal(km,nbAncien)) ;

        // Affichage du résultat
        window.document.querySelector("#remuneration").innerHTML =
                "La rémunération sera de : " + remuneration + " €";
    });
});

window.addEventListener("load", function () {
    // Déclaration de l'index de parcours
    let i;
    // tabInputs est une collection de <input>
    let tabInputs = window.document.querySelectorAll("input");
    // Parcours de tabInputs en s'appuyant sur le nombre de <input>
    for (i = 0; i < tabInputs.length; i++) {
        // Ajout d'un Listener sur tous les <input> sur l'évènement onKeyUp
        tabInputs[i].addEventListener("keyup", afficheRemu);
    }
});

function recupValeur(id) {
    return parseInt(window.document.querySelector(id).value);
}

function afficheRemu(nombre) {
    window.document.querySelector("#remuneration").innerHTML = "La rémunération sera de : " + nombre + " €";
}

