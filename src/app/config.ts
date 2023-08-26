export const appConfig = {
  defaultUnit: 'metric',
  defaultCity: {
    coord: {
      latitude: 35.715298,
      longitude: 51.404343
    }
  }
};

export const apiConfig = {
  host: 'https://api.openweathermap.org/data/2.5',
  appId: 'f169086b9044aa367183457a1f285c14',
  measurementUnits: {
    metric: {
      temperature: 'C',
      windSpeed: 'm/s',
      pressure: 'mmHg'
    },
    imperial: {
      temperature: 'F',
      windSpeed: 'mil/h',
      pressure: 'hPa'
    }
  },
  amountForecastDays: 16,
  updateInterval: {
    forecast: 300000, // 5 minutes
    weather: 300000 // 5 minutes
  }
};
