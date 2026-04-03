/******************************************************************************
                                  Types
******************************************************************************/

type WeatherMainGroup = 'Clear' | 'Clouds' | 'Rain' | 'Drizzle' | 'Thunderstorm' | 'Snow' | 'Mist' | 'Smoke' | 'Haze' | 'Dust' | 'Fog' | 'Sand' | 'Ash' | 'Squall' | 'Tornado' | 'Unknown';

type Coordinates = {
  lat: number;
  lon: number;
}

type WeatherCondition = {
  id: number;
  main: WeatherMainGroup;
  description: string;
  icon: string;
}

type MainTempInfo = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

type Wind = {
  speed: number;
  deg: number;
  gust?: number;
}

type Clouds = {
  all: number;
}

type Precipitation = {
  '1h'?: number;
}

type Sys = {
  type?: number;
  id?: number;
  message?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface IWeatherParameters {
  lat: number;
  lon: number;
  exclude?: ('current' | 'minutely' | 'hourly' | 'daily' | 'alerts')[];
  units?: 'standard' | 'metric' | 'imperial';
  lang?: string;
}

export interface IWeatherInfo {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: MainTempInfo;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  rain?: Precipitation;
  snow?: Precipitation;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface IWeatherInOneCall {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: WeatherCondition[];
  };
  minutely?: {
    dt: number;
    precipitation: number;
  }[];
  hourly?: {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: WeatherCondition[];
  }[];
  daily?: {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    weather: WeatherCondition[];
    clouds: number;
    pop: number; // Probability of precipitation
    rain?: number; // Rain volume for last 24 hours
    snow?: number; // Snow volume for last 24 hours
  }[];
  alerts?: {
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
    tags: string[];
  }[]
}

export interface IWeatherApiResponse {
  weatherCondition: WeatherMainGroup[];
  weatherConditionDescription: string;
  feelsLikeCondition: string;
  currentWeather: {
    temp: string;
    feelsTemp: string;
    humidity: string;
    windSpeed: string;
    cloudiness: string;
  },
  hasAlerts: 'Yes' | 'No';
  activeAlerts?: {
    sender: string;
    event: string;
    description: string[];
  }[];
}
