import { IWeatherApiResponse, IWeatherInOneCall } from "@src/models/Weather.model";

/******************************************************************************
                                Constants
******************************************************************************/

const weatherConditions = ['Cold', 'Hot', 'Comfortable', 'Mild', 'Chilly', 'Warm'] as const;


/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Based on current weather conditions, calculate the "feels like" condition. 
 * If is cold, hot, comfortable, etc. 
 */
export function getFeelsLikeConditionFromWeather({ current }: IWeatherInOneCall): string {
  const { feels_like, humidity, wind_speed } = current
  if (feels_like > 85 || (feels_like > 80 && humidity > 70)) {
    return weatherConditions[1]; // Hot
  } else if (feels_like < 40 || (feels_like < 50 && wind_speed > 20)) {
    return weatherConditions[0]; // Cold
  } else if (feels_like >= 60 && feels_like <= 75) {
    return weatherConditions[2]; // Comfortable
  } else if (feels_like > 75 && feels_like <= 85) {
    return weatherConditions[5]; // Warm
  } else if (feels_like >= 50 && feels_like < 60) {
    return weatherConditions[4]; // Chilly
  } else {
    return weatherConditions[3]; // Mild
  }
}

function getCloudinessCondition(cloudiness: number): string {
  if (cloudiness <= 5) {
    return 'Clear';
  } else if (cloudiness > 5 && cloudiness <= 25) {
    return 'Partly Cloudy';
  } else if (cloudiness > 25 && cloudiness <= 50) {
    return 'Cloudy';
  } else if (cloudiness > 50 && cloudiness <= 75) {
    return 'Mostly Cloudy';
  } else {
    return 'Overcast';
  }
}

export function processWeatherDataForResponse(weatherData: IWeatherInOneCall): IWeatherApiResponse {
  if (!weatherData || !weatherData.current) {
    return {
      weatherCondition: ['Unknown'],
      weatherConditionDescription: 'No description',
      feelsLikeCondition: 'Unknown',
      currentWeather: {
        temp: 'Unknown',
        feelsTemp: 'Unknown',
        humidity: 'Unknown',
        windSpeed: 'Unknown',
        cloudiness: 'Unknown',
      },
      hasAlerts: 'No',
      activeAlerts: [],
    };
  }
  const feelsLikeCondition = getFeelsLikeConditionFromWeather(weatherData);
  const { current, alerts } = weatherData;
  const { temp, feels_like, humidity, clouds, wind_speed, weather } = current;
  return {
    weatherCondition: weather?.map(w => w.main) || ['Unknown'],
    weatherConditionDescription: weather?.map(w => w.description)?.join(', ') || 'No description',
    feelsLikeCondition,
    currentWeather: {
      temp: `${temp}°F`,
      feelsTemp: `${feels_like}°F`,
      humidity: `${humidity}%`,
      windSpeed: `${wind_speed} mph`,
      cloudiness: getCloudinessCondition(clouds),
    },
    hasAlerts: !!alerts?.length ? 'Yes' : 'No',
    activeAlerts: alerts?.map(alert => ({
      sender: alert.sender_name,
      event: alert.event,
      // Alert descriptions: what, where, when, impacts.
      description: alert.description.replace(/\n/g, ' ').replace(/\.\.\./g, ': ')?.split('*')?.map(line => line.trim()).filter(line => line) || [],
    })) || [],
  }
}
