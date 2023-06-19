import axios from "axios";
import { months, days } from "./Date.js";

//Mykilsko Slobidska is a part Kyiv
const lat = '50.4458';
const lon = '30.6056';
const APIkey = '64ababe0621d5856ae4216d30e3e22d5';

export async function getHourlyWeatherData(interval) {
  let step = '';
  if (interval === 1) {
    step = '3';
  } else {
    step = '6';
  }

  let resultData = `Weather in Kyiv with ${step}-hour intervals: \n`;
  let previousDay, previousMonth, previousDate;

  const apiResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`);
  const weather = apiResponse.data;
  console.log(weather);

  for (let i = 0; i < weather.list.length - 1; i += interval) {
    const dateTime = new Date(weather.list[i].dt * 1000);
    const day = days[dateTime.getDay()];
    const month = months[dateTime.getMonth()];
    const date = dateTime.getDate();

    if (day !== previousDay || month !== previousMonth || date !== previousDate) {
      resultData += `\n${day}, ${month} ${date}: \n`;
    }

    const hours = String(dateTime.getHours()).padStart(2, '0');
    const mins = String(dateTime.getMinutes()).padStart(2, '0');

    let temperature = Math.round(weather.list[i].main.temp);
    temperature = temperature > 0 ? '+' + temperature : temperature === 0 ? 0 : temperature;

    let feelsLike = Math.round(weather.list[i].main.feels_like);
    feelsLike = feelsLike > 0 ? '+' + feelsLike : feelsLike === 0 ? 0 : feelsLike;

    resultData += `  ${hours}:${mins}   ${temperature} °C, feels like ${feelsLike} °C, ${weather.list[i].weather[0].description} \n`;
    [previousDay, previousMonth, previousDate] = [day, month, date];
  }

  return resultData;
}