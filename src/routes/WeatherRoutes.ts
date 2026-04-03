import { NextFunction } from 'express';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import WeatherService from '@src/services/WeatherService';

import { Req, Res } from './common/express-types';


/**
 * Get all weather information.
 *
 * @route GET /api/weather/onecall
 */
async function getWeatherOneCall(req: Req, res: Res, next: NextFunction) {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lon = parseFloat(req.query.long as string);
    const weatherData = await WeatherService.getAllWeatherByLatLong(lat, lon);
    res.status(HttpStatusCodes.OK).json(weatherData);
  } catch (error) {
    next(error);
  }
}

/**
 * Get basic weather information.
 *
 * @route GET /api/weather/basic
 */
async function getWeatherBasic(req: Req, res: Res, next: NextFunction) {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lon = parseFloat(req.query.long as string);
    const weatherData = await WeatherService.getWeatherInfoByLatLong(lat, lon);
    res.status(HttpStatusCodes.OK).json(weatherData);
  } catch (error) {
    next(error);
  }
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getWeatherOneCall,
  getWeatherBasic,
} as const;
