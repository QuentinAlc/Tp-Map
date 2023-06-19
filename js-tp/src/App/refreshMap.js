class ButtonRefreshMap {

    constructor() {
        this.button = document.getElementById('button-refresh-map');
        this.button.addEventListener('click', this.refreshMap.bind(this));
    }
    refreshMap() {
        window.location.reload();
    }

    

}

export default ButtonRefreshMap;