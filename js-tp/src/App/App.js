//importer la config de mapbox
import config from '../../app.config.json';
//importer la librairie mapbox
import mapboxgl from 'mapbox-gl';
//importer style de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
//importer les script de bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//importer le style de mapbox
import 'mapbox-gl/dist/mapbox-gl.css';
//en dernier importer le fichier css
import '../assets/style.css';
import UserEvents from './userEvents';
import MarkerStorageService from './MarkerStorageService';
class App {
    markers = [];
    STORAGE_NAME = 'userEvents';

    removeMarkers() {
        for (let marker of this.markers) {
            marker.remove(); // Utiliser la méthode remove() pour supprimer le marqueur de la carte
        }

        this.markers = []; // Vider l'array des marqueurs
    }

    //propriétés

    elInputTitle;
    elInputDescription;
    elInputEventStart;
    elInputEventEnd;
    elInputLat;
    elInputLong;
    userEvents;


    userEvents = []
    //container de la map
    elDivMap;
    //instance de la map
    map;


    start() {
        console.log('App démarrée...');
        this.loadDom();
        this.initMap();
        this.markerStorageService = new MarkerStorageService();
        const markerRead = this.markerStorageService.readStorage();

        if (markerRead.length > 0) return; // on regarde si le localstorage contient des evenements

    }

    initMap() {
        //initialiser la map
        //on récupère la clé d'api dans le fichier de config
        mapboxgl.accessToken = config.apis.mapbox_gl.api_key;
        //on instancie la map
        this.map = new mapboxgl.Map({
            container: this.elDivMap,
            style: config.apis.mapbox_gl.map_styles.outdoors,
            center: [2.79, 42.68],
            zoom: 12
        });
        const nav = new mapboxgl.NavigationControl();
        this.map.addControl(nav, 'top-left');

        //on écoute le clique sur la map
        this.map.on('click', this.handleClickMap.bind(this));


    }

    // Methode qui clique sur la map
    handleClickMap(evt) {
        // Récupérer la longitude et la latitude à partir de l'événement de clic
        const lng = evt.lngLat.lng;
        const lat = evt.lngLat.lat;

        // Assigner la valeur de l'événement à l'input
        this.elInputLong.value = lng;
        this.elInputLat.value = lat;




    }

    loadDom() {
        //MAP
        this.elDivMap = document.createElement('div');
        this.elDivMap.id = 'map';

        document.body.appendChild(this.elDivMap);





        const formContainer = document.createElement('div');
        formContainer.className = 'form-container';
        this.elDivMap.appendChild(formContainer);

        const form = document.createElement('form');
        form.id = 'event-form';



        const elLabelTitle = document.createElement('label');
        elLabelTitle.setAttribute('for', 'input-title');
        elLabelTitle.className = 'event-label';
        elLabelTitle.textContent = "Titre de l'évènement :";




        //ON MET .this ICI CAR ON A DECLARE LA VARIABLE PLUS HAUT AU DEBUT DE LA CLASSE

        // <input id="input-title" type="text" class="event-input">
        this.elInputTitle = document.createElement('input');
        this.elInputTitle.id = 'input-title';
        this.elInputTitle.type = 'text';
        this.elInputTitle.className = 'event-input';


        // -- DESCRIPTION DE L'EVENEMENT --
        // <label for="input-description" class="event-label"> Description de l'évènement </label>
        const elLabelDescription = document.createElement('label');
        elLabelDescription.setAttribute('for', 'input-description');
        elLabelDescription.className = 'event-label';
        elLabelDescription.textContent = "Description de l'évènement";

        // <textarea id="input-description" class="event-input" rows="4"> </textarea>
        this.elInputDescription = document.createElement('textarea');
        this.elInputDescription.id = 'input-description';
        this.elInputDescription.className = 'event-input';
        this.elInputDescription.rows = 3;



        const elStartDate = document.createElement('label');
        elStartDate.setAttribute('for', 'datetime-start');
        elStartDate.className = 'event-label';
        elStartDate.textContent = "Date de début";
        this.elInputEventStart = document.createElement('input');
        this.elInputEventStart.id = 'datetime-start';
        this.elInputEventStart.type = 'datetime-local';
        this.elInputEventStart.className = 'event-input';

        const elEndDate = document.createElement('label');
        elEndDate.setAttribute('for', 'datetime-end');
        elEndDate.className = 'event-label';
        elEndDate.textContent = "Date de fin";
        this.elInputEventEnd = document.createElement('input');
        this.elInputEventEnd.id = 'datetime-end';
        this.elInputEventEnd.type = 'datetime-local';
        this.elInputEventEnd.className = 'event-input';

        const elLat = document.createElement('label');
        elLat.setAttribute('for', 'input-lat');
        elLat.className = 'event-label';
        elLat.textContent = "Latitude";
        this.elInputLat = document.createElement('input');
        this.elInputLat.id = 'input-lat';
        this.elInputLat.type = 'number';
        this.elInputLat.className = 'event-input';

        const elLong = document.createElement('label');
        elLong.setAttribute('for', 'input-long');
        elLong.className = 'event-label';
        elLong.textContent = "Longitude";
        this.elInputLong = document.createElement('input');
        this.elInputLong.id = 'input-long';
        this.elInputLong.type = 'number';
        this.elInputLong.className = 'event-input';

        const elButtonAdd = document.createElement('button');
        elButtonAdd.type = 'button';
        elButtonAdd.textContent = 'Ajouter';
        elButtonAdd.className = 'btn btn-success';
        elButtonAdd.addEventListener('click', this.handleFormSubmit.bind(this));


        const elButtonsDelete = document.createElement('button');
        elButtonsDelete.type = 'button';
        elButtonsDelete.textContent = 'Tout Supprimer';
        elButtonsDelete.className = 'btn btn-danger';
        elButtonsDelete.addEventListener('click', this.removeMarkers.bind(this));




        form.appendChild(elLabelTitle);
        form.appendChild(this.elInputTitle);
        form.appendChild(elLabelDescription);
        form.appendChild(this.elInputDescription);
        form.appendChild(elStartDate);
        form.appendChild(this.elInputEventStart);
        form.appendChild(elEndDate);
        form.appendChild(this.elInputEventEnd);
        form.appendChild(elLat);
        form.appendChild(this.elInputLat);
        form.appendChild(elLong);
        form.appendChild(this.elInputLong);
        form.appendChild(elButtonsDelete);
        form.appendChild(elButtonAdd);
        formContainer.appendChild(form);
        document.body.appendChild(formContainer);



    }


    handleFormSubmit() {
        const title = this.elInputTitle.value;
        const description = this.elInputDescription.value;
        const startDate = this.elInputEventStart.value;
        const endDate = this.elInputEventEnd.value;
        const coordinatesLat = parseFloat(this.elInputLat.value);
        const coordinatesLong = parseFloat(this.elInputLong.value);
        const markerColor = this.markerColor(startDate); // Correction : Placer cette ligne après la récupération de la date de début



        let newEvent = new UserEvents(title, description, endDate, startDate, coordinatesLat, coordinatesLong);

        this.userEvents.push(newEvent);
        // on cree la popup pour que le marker prenne en compte tout le form
        const popupContent = `<h3>${title}</h3>
                      <p>Date de début : ${startDate}</p>
                      <p>Date de fin : ${endDate}</p>`;

        const popupContent2 = `<h3>${title}</h3>
            <p>Description : ${description}</p>
                      <p>Date de début : ${startDate}</p>
                      <p>Date de fin : ${endDate}</p>`;


        // Ajouter le marqueur à la carte
        const marker = new mapboxgl.Marker({ color: markerColor })
            .setLngLat([coordinatesLong, coordinatesLat])
            .setPopup(new mapboxgl.Popup().setHTML(popupContent))
            .addTo(this.map)
        this.markers.push(marker);

        marker.getElement().addEventListener('mouseenter', () => {
            marker.getPopup().setHTML(popupContent).addTo(this.map);
        });

        marker.getElement().addEventListener('mouseleave', () => {
            marker.getPopup().remove();
        });

        marker.getElement().addEventListener('click', () => {
            marker.getPopup().setHTML(popupContent2).addTo(this.map);
        });


        // Attache la pop-up au marqueur
        marker.setPopup(new mapboxgl.Popup().setHTML(popupContent));

        console.log(this.userEvents);
        this.markers.push(marker);
        console.log(this.markers);
        this.markerStorageService.saveStorage(this.userEvents);



    }

    // resetForm() {
    //     this.elInputTitle.value = '';
    //     this.elInputDescription.value = '';
    //     this.elInputEventStart.value = '';
    //     this.elInputEventEnd.value = '';
    //     this.elInputLat.value = '';
    //     this.elInputLong.value = '';
    //     this.removeMarkers();
    // }


    markerColor(startDate) {
        const currentDate = new Date();
        const eventDate = new Date(startDate);
        const diff = eventDate.getTime() - currentDate.getTime();
        const diffDays = Math.floor(diff / (1000 * 3600 * 24));

        if (diffDays < 0) {
            return 'red'; // Événement dépassé
        } else if (diffDays > 3) {
            return 'green'; // Événement dans plus de 3 jours
        } else if (diffDays <= 3) {
            return 'orange'; // Événement dans 3 jours ou moins
        }
    }

}


const app = new App();

export default app;