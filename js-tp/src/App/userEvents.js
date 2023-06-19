class UserEvents {
    title;
    description;
    startDate;
    endDate;
    longitude;
    latitude;
    marker;





    constructor(title, description, startDate, endDate, longitude, latitude) {
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.longitude = longitude;
        this.latitude = latitude;





    }
    toJSON() {
        return {
            title: this.title,
            description: this.description,
            startDate: this.startDate,
            endDate: this.endDate,
            longitude: this.longitude,
            latitude: this.latitude
        }
    }

}




export default UserEvents;
