

 function gestionNbAccidents(nbAccidents) {
    if (nbAccidents > 3) {
        window.document.querySelector('#acacher').style.display = 'none';
        // Si #txtTropAccidents n'existe pas, on le créé
        if (!window.document.querySelector('#txtTropAccidents')) {
            let elH3 = window.document.createElement('h3');
            elH3.id = 'txtTropAccidents';
            elH3.appendChild(window.document.createTextNode('Prime annuelle annulée, trop d\'accidents !'));
            window.document.querySelector('#recueilinfos').appendChild(elH3);
        }
    } else {
        window.document.querySelector('#acacher').style.display = 'block';
        // Si #txtTropAccidents existe, on le supprime
        if (window.document.querySelector('#txtTropAccidents')) {
            window.document.querySelector('#txtTropAccidents').remove();
        }
    }
}

/**
 * Fonction qui retourne la prime de distance
 *
 * @param {integer} nb
 * @returns {float}
 */
function recupPrimeDist(nb) {
    const primeMax = 900, primeKm = 0.01;
    let indem = nb * primeKm;
    if (indem > primeMax) {
        return primeMax;
    } else {
        return indem;
    }
}
/**
 * Fonction qui retourne la prime d'ancienneté
 *
 * @param {integer} nb
 * @returns {float}
 */
function recupPrimeAncien(nb) {
    const nbMin = 4, primeMin = 300, primeSupp = 30;
    if (nb >= nbMin) {
        return primeMin + (nb - nbMin) * primeSupp;
    } else {
        return 0.0;
    }
}
/**
 * Fonction qui retourne la prime annuelle
 *
 * @param {float} primeDist
 * @param {float} primeAncien
 * @param {integer} nbAccidents
 * @returns {float}
 */
function recupPrimeAnnuelle(primeDist, primeAncien, nbAccidents) {
    if (nbAccidents > 3) {
        return 0;
    } else {
        return Number(((primeDist + primeAncien) / (1 + nbAccidents)).toFixed(2));
    }
}

window.addEventListener('load', function () {
    // tabEvents est une collection d'évenements
    let tabEvents = ['keyup', 'click'];
    // tabInputs est une collection de <input>
    let tabInputs = window.document.querySelectorAll('input[type="number"]');
    // Parcours de tabInputs en s'appuyant sur le nombre de <input> et sur tabEvents
    for (let i = 0; i < tabInputs.length; i++) {
        for (let j = 0; j < tabEvents.length; j++) {
            // Ajout des listeners sur tous les <input> des events listés dans tabEvents
            tabInputs[i].addEventListener(tabEvents[j], calculerPrime);
        }
    }
    // Gestion de l'input de type range (recopie de la valeur dans l'output)
    window.document.querySelector('#nb_accidents').addEventListener('change', function () {
        window.document.querySelector('#o_nb_accidents').value =
                recupValeur('#nb_accidents');
        calculerPrime();
    });
});

/**
 * Procédure qui s'occupe du recueil des paramètres de calcul de la prime ainsi que de
 * l'affichage
 *
 * @returns {void}
 */
function calculerPrime() {
    let nbAccidents = recupValeur('#nb_accidents');
    let nbAncien = recupValeur('#nb_ancien');
    let nbKm = recupValeur('#nb_km');
    let primeAnnuelleSansAccident = recupPrimeAnnuelle(recupPrimeDist(nbKm),
            recupPrimeAncien(nbAncien), 0);
    let primeAnnuelle = recupPrimeAnnuelle(recupPrimeDist(nbKm),
            recupPrimeAncien(nbAncien), nbAccidents);
    // Gestion de l'affichage de la prime en fonction du nombre d'accidents
    gestionNbAccidents(nbAccidents, primeAnnuelleSansAccident, primeAnnuelle);
}

/**
 * Procédure qui gère l'affichage en fonction du nombre d'accidents
 *
 * @param {integer} nbAccidents
 * @param {float} primeAnnuelleSansAccident
 * @param {float} primeAnnuelle
 * @returns {void}
 */
function gestionNbAccidents(nbAccidents, primeAnnuelleSansAccident, primeAnnuelle) {
    let elH2 = window.document.querySelector('#remuneration');
    // Si #remuneration (<h2 id='remuneration'></h2>) n'existe pas, on le créé
    if (!elH2) {
        elH2 = window.document.createElement('h2');
        elH2.id = 'remuneration';
        window.document.querySelector('#recueilinfos').appendChild(elH2);
    }

    // Gestion de l'affichage avec gestion particulière pour 0 et 1 accident
    if (nbAccidents === 0) {
        elH2.innerHTML = 'Votre prime sera de ' + primeAnnuelle + ' €';
    } else if (nbAccidents === 1) {
        elH2.innerHTML = 'Votre prime sera de ' + primeAnnuelle
                + ' € alors qu\'elle aurait pu être de '
                + primeAnnuelleSansAccident + ' € sans ' + nbAccidents
                + ' accident responsable...';
    } else {
        elH2.innerHTML = 'Votre prime sera de ' + primeAnnuelle
                + ' € alors qu\'elle aurait pu être de '
                + primeAnnuelleSansAccident + ' € sans ' + nbAccidents
                + ' accidents responsables...';
    }
}
/**
 * Fonction qui retourne un entier depuis une valeur prise dans le DOM et qui replace le
 * champ à 0 si la valeur saisie n'est pas un nombre
 *
 * @param {String} id
 * @return {integer}
 */
function recupValeur(id) {
    var valeur = parseInt(window.document.querySelector(id).value);
    if (isNaN(valeur)) {
        window.document.querySelector(id).value = 0;
        return 0;
    } else {
        return valeur;
    }
}



/*

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
    // Déclaration et affectation des variables
    let nbAncien = recupValeur("#num_ancien");
    let km = recupValeur("#num_km");
    let nbAcc = recupValeur("#num_Accident");
    let remuneration = reduction(recupPrimeAnciennete(nbAncien) + recupPrimeDistance(km), nbAcc) ;
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
    window.document.querySelector("#remuneration").innerHTML = "La prime sera de : " + nombre + " €" ;
}

 */