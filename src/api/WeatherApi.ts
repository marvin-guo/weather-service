import querystring from 'querystring';
import { IWeatherInOneCall, IWeatherInfo, IWeatherParameters } from '@src/models/Weather.model';
import EnvVars from '@src/common/constants/env';
import { RouteError } from '@src/common/utils/route-errors';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

const apiKey = EnvVars.ApiKey;
const apiBaseUrl = EnvVars.ApiBaseUrl;

/**
 * Get Open Weather 3.0 one-call data.
 */
async function getWeatherOneCallData({ lat, lon, units = 'imperial', exclude = ['daily', 'hourly', 'minutely'] }: IWeatherParameters): Promise<IWeatherInOneCall | null> {
  const queryString = querystring.stringify({
    lat,
    lon,
    units,
    exclude: exclude.join(','),
  });
  const response = await fetch(`${apiBaseUrl}/3.0/onecall?${queryString}&appid=${apiKey}`);
  if (!response.ok) {
    throw new RouteError(
      response.status as HttpStatusCodes,
      `Failed to fetch weather data: ${response.status} ${response.statusText}`
    );
  }
  return response.json() as unknown as IWeatherInOneCall;
}

/**
 * Get Open Weather 2.5 weather data.
 */
async function getWeatherInfo({ lat, lon, units = 'imperial' }: IWeatherParameters): Promise<IWeatherInfo | null> {
  const queryString = querystring.stringify({
    lat,
    lon,
    units,
  });
  const response = await fetch(`${apiBaseUrl}/2.5/weather?${queryString}&appid=${apiKey}`);
  if (!response.ok) {
    throw new RouteError(
      response.status as HttpStatusCodes,
      `Failed to fetch weather info: ${response.status} ${response.statusText}`
    );
  }
  return response.json() as unknown as IWeatherInfo;
}

export default {
  getWeatherOneCallData,
  getWeatherInfo,
} as const;
