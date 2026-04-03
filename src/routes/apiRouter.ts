import { Router } from 'express';

import Paths from '@src/common/constants/Paths';

import WeatherRoutes from './WeatherRoutes';

import validateGeo from './middleware/validateGeo';

/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();

// ----------------------- Add WeatherRouter --------------------------------- //

const weatherRouter = Router();

weatherRouter.get(Paths.Weather.GetOneCall, WeatherRoutes.getWeatherOneCall);
weatherRouter.get(Paths.Weather.GetBasic, WeatherRoutes.getWeatherBasic);

apiRouter.use(Paths.Weather._, validateGeo, weatherRouter);

/******************************************************************************
                                Export
******************************************************************************/

export default apiRouter;
