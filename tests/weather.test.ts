import { vi } from 'vitest';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { JetPaths as Paths } from '@src/common/constants/Paths';
import { IWeatherApiResponse } from '@src/models/Weather.model';

import { agent } from './support/agent';
import { TestRes } from './common/supertest-types';

/******************************************************************************
                               Constants
******************************************************************************/

const { BAD_REQUEST, OK } = HttpStatusCodes;

/******************************************************************************
                                 Tests
******************************************************************************/

describe('Weather API', () => {
  beforeAll(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        lat: 41.71,
        lon: -71.56,
        current: {
          temp: 42,
          feels_like: 38,
          humidity: 91,
          clouds: 100,
          wind_speed: 9.22,
          weather: [
            { id: 701, main: 'Mist', description: 'mist' },
            { id: 300, main: 'Drizzle', description: 'light intensity drizzle' },
          ],
        },
        alerts: [
          { sender_name: 'NWS Tulsa', event: 'Flood Warning', start: 1690000000, end: 1690003600, description: 'Flooding expected in the area.' },
        ],
      }),
    } as unknown as Response);
  });

  describe(`GET ${Paths.Weather.GetOneCall()}`, () => {
    it('should return weather data for valid lat/long', async () => {
      const response: TestRes<IWeatherApiResponse> = await agent.get(Paths.Weather.GetOneCall()).query({ lat: 40.7128, long: -74.0060 });
      expect(response.status).toBe(OK);
      expect(response.body).toHaveProperty('weatherCondition');
      expect(response.body.feelsLikeCondition).toEqual('Cold'); // Based on mocked response
      expect(response.body.weatherCondition).toContain('Mist'); // Based on mocked response
      expect(response.body.currentWeather.cloudiness).toEqual('Overcast'); // Based on mocked response
      expect(response.body.hasAlerts).toEqual('Yes'); // Based on mocked response
    });

    it('should return 400 for missing lat/long', async () => {
      const response = await agent.get(Paths.Weather.GetOneCall());
      expect(response.status).toBe(BAD_REQUEST);
      expect(response.body.errors).toContainEqual(expect.objectContaining({ msg: 'Latitude must be a number between -90 and 90' }));
    });

    it('should return 400 for invalid lat/long', async () => {
      const response = await agent.get(Paths.Weather.GetOneCall()).query({ lat: '70', long: '200' });
      expect(response.status).toBe(BAD_REQUEST);
      expect(response.body.errors.length).toEqual(1);
    });
  });
});
