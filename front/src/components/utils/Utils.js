export function formatPrix(prix) {
    const options = {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "EUR"
    }
    const prixFormated = new Intl.NumberFormat('fr-FR', options).format(prix);

    return prixFormated;
}

/*TRI TABLEAU*/
const tri = function(v1, v2) {
    if (v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2)){
        return v1 - v2;
    }
    else {
        return v1.toString().localeCompare(v2);
    }
};

export const trierColonne = (donnees, setDonnees, colonne, isOrdre) => {
    const copieDonnees = [...donnees];
    if (isOrdre) {
        copieDonnees.sort((a,b) => tri(a.ordre_affichage,b.ordre_affichage));
    }
    copieDonnees.sort((a,b) => tri(a[colonne],b[colonne]));
    setDonnees(copieDonnees);
}