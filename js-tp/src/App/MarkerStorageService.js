const STORAGE_NAME = 'userEvents';

class MarkerStorageService {
    //méthode qui récupère les data de localStorage
    readStorage() {
        //declarer une variable qui va contenir les datas
        let userEvents = [];
        //récupérer les data du localStorage
        const serializedData = localStorage.getItem(STORAGE_NAME);

        //traitement si la key n'existe pas
        if (!serializedData) return userEvents;

        //si la key existe on va essayer de parser les datas
        try {
            //on tente de parser les datas
            userEvents = JSON.parse(serializedData);
        } catch (error) {
            // Si cela ne fonctionne pas (pour cause de données corrompues )
            // On supprime les données
            localStorage.removeItem(STORAGE_NAME);
        }

        //on retourne les datas
        return userEvents;
    }

    //méthode qui sauvegarde les data dans localStorage
    saveStorage(userEvents) {
        //transformer l'objet reçu en paramètre en chaîne de caractères JSON
        const serializedData = JSON.stringify(userEvents);
        //une fois stringifier il faut l'enregistrer dans le localStorage
        try {
            //on essaye d'enregistrer dans le localStorage
            localStorage.setItem(STORAGE_NAME, serializedData);

        } catch (error) {
            //si on a une erreur on l'affiche
            console.log(error);
            return false;
        }

    }
}

export default MarkerStorageService;
