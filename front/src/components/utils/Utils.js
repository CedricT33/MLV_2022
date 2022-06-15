export function formatPrix(prix) {
    const options = {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "EUR"
    }
    const prixFormated = new Intl.NumberFormat('fr-FR', options).format(prix);

    return prixFormated;
}