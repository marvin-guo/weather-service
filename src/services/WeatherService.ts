import { processWeatherDataForResponse } from '@src/common/utils/weather-utils';
import { IWeatherInfo, IWeatherInOneCall, IWeatherApiResponse } from '@src/models/Weather.model';
import WeatherApi from '@src/api/WeatherApi';

const unknownErrorMessage = 'An unknown error occurred while fetching weather data.';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get all one-call weather information by lat/long coordinates.
 */
async function getAllWeatherByLatLong(lat: number, lon: number): Promise<IWeatherApiResponse | null> {
  try {
    const weatherData = await WeatherApi.getWeatherOneCallData({ lat, lon });
    return processWeatherDataForResponse(weatherData as IWeatherInOneCall);
  } catch (error) {
    throw error instanceof Error ? error : new Error(unknownErrorMessage);
  }
}

/**
 * Get basic weather information by lat/long coordinates.
 */
async function getWeatherInfoByLatLong(lat: number, lon: number): Promise<IWeatherInfo | null> {
  try {
    const weatherInfo = await WeatherApi.getWeatherInfo({ lat, lon });
    return weatherInfo;
  } catch (error) {
    throw error instanceof Error ? error : new Error(unknownErrorMessage);
  }
}


/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAllWeatherByLatLong,
  getWeatherInfoByLatLong,
} as const;
