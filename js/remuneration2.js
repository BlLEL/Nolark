/**
 * Fonction qui retourne la prime d'ancienneté
 * @param {integer} nb
 * @param {float} fixe
 * @returns {float}
 */

function recupPrimeAnciennete(nb, fixe) {
    const nbAncienMin = 4, txAncienMin = 0.03;
    if (nb === nbAncienMin) {
        return (fixe + 300);
    } else if (nb >= nbAncienMin+1) {
        return (fixe + 30);
    } else {
        return 0.0;
    }
}