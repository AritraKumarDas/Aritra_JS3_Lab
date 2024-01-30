import { WeatherAPI } from "./weatherAPI.js";


class WeatherApp {

    init() {
        this.addListeners();
    }

    addListeners() {

        const formElement = document.querySelector('#form');
        const userInputElement = document.querySelector('#form input');

        formElement.addEventListener('submit', async (e) => {

            e.preventDefault();

            const userInput = userInputElement.value.trim();

            const weatherAPIObj = new WeatherAPI();
            weatherAPIObj.constructURL(userInput || "Bangalore");
            try {
                const jsonData = await weatherAPIObj.invokeURL();
                if (jsonData == 'INVALID SEARCH') {
                    throw new Error("Invalid City Name!")
                }
                const weatherInfo = weatherAPIObj.getWeatherReport(jsonData);

                const locationElement = document.querySelector('.location .city');
                locationElement.innerText = weatherInfo.location;

                const dateElement = document.querySelector('.location .date');
                dateElement.innerText = weatherInfo.dateString;

                const tempElement = document.querySelector('.current span:first-child');
                tempElement.innerText = weatherInfo.temp;

                const weatherElement = document.querySelector('.current .weather');
                weatherElement.innerText = weatherInfo.desc;

                const lowTempElement = document.querySelector('.hi-low .low');
                lowTempElement.innerText = weatherInfo.tempMin;

                const highTempElement = document.querySelector('.hi-low .high');
                highTempElement.innerText = weatherInfo.tempMax;


            } catch (e) {
                alert(e.message);
            }

        })

    }
}

export { WeatherApp }