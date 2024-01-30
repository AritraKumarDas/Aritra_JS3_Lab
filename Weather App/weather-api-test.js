import { json } from "stream/consumers";
import { WeatherAPI } from "./weatherAPI.js";

function test() {
    const weatherApiObj = new WeatherAPI();
    weatherApiObj.constructURL("Brazil")

    console.log(weatherApiObj.apiURL.toString());
}

async function test2() {
    const weatherApiObj = new WeatherAPI();
    weatherApiObj.constructURL("Mumbai")
    const json = await weatherApiObj.invokeURL();
    console.log(weatherApiObj.getWeatherReport(json));
    console.log(weatherApiObj.getTime());
}



test2();