const UNITS = "metric";

const APP_ID = "9762cf7f9a6739e1280e78a4b31e61ef"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

class WeatherAPI {

    constructor() {
        this.apiURL = new URL(BASE_URL);

    }

    constructURL(location) {
        this.apiURL.searchParams.append("q", location);
        this.apiURL.searchParams.append("appid", APP_ID);
        this.apiURL.searchParams.append("units", UNITS);

    }

    async invokeURL() {
        try {
            const res = await fetch(this.apiURL);
            console.log(res);
            if (!res.ok) {
                throw new Error("INVALID SEARCH")
            }
            const data = await res.json()
            return data;
        } catch (e) {
            return e.message;
        }

    }

    getWeatherReport(jsonResp) {

        const weatherObj = {
            temp: Math.round(jsonResp.main.temp),
            tempMax: Math.round(jsonResp.main.temp_max),
            tempMin: Math.round(jsonResp.main.temp_min),
            desc: jsonResp.weather[0].main,
            location: `${jsonResp.name}, ${jsonResp.sys.country}`,
            dateString: this.getTime()

        }
        return weatherObj;
    }

    getTime() {
        const today = new Date();
        const date = today.getDate();
        const year = today.getFullYear();

        let month;
        switch (today.getMonth()) {
            case 0:
                month = "January";
                break;

            case 1:
                month = "February";
                break;

            case 2:
                month = "March";
                break;

            case 3:
                month = "April";
                break;

            case 4:
                month = "May";
                break;

            case 5:
                month = "June";
                break;

            case 6:
                month = "July";
                break;
            case 7:
                month = "August"
                break;
            case 8:
                month = "September"
                break;
            case 9:
                month = "October"
                break;
            case 10:
                month = "November"
                break;
            case 11:
                month = "December"
                break;

        }

        let day;
        switch (today.getDay()) {
            case 0:
                day = "Sunday";
                break;

            case 1:
                day = "Monday";
                break;

            case 2:
                day = "Tuesday";
                break;

            case 3:
                day = "Wednesday";
                break;

            case 4:
                day = "Thursday";
                break;

            case 5:
                day = "Friday";
                break;

            case 6:
                day = "Saturday";
                break;

        }
        return `${day}, ${date} ${month} ${year}`;
    }

}

export { WeatherAPI }