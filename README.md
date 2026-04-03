## About

This is a Weather Service Project. The http server uses the Open Weather API that exposes an endpoint that takes in lat/long coordinates.

## Available endpoints (after npm install and npm run dev)

### `http://localhost:3000/api/weather/onecall?lat={lat}&long={long}`

Weather Information:
* weatherCondition - condition array lile ['Rain']
* weatherConditionDescription
* feelsLikeCondition - feeling like Cold, Hot, Chilly, Warm, Mild
* currentWeather - some temparature, humidity etc information
* hasAlerts - Yes or No
* activeAlerts - details include sender, description

Some Location examples (copy to replace in above api url):
* Rhode Island: lat=41.71&long=-71.56
* Ocean near Boston: lat=41&long=-71
* Monett, MO: lat=36.92&long=-93.92
* Canada Quebec: lat=51.40&long=-73.11
* Landon: lat=51.51&long=-0.1

## Available Scripts

### `npm run clean-install`

Remove the existing `node_modules/` folder, `package-lock.json`, and reinstall all library modules.

### `npm run dev` 

Run the server in development with hot reloading and browser refresh (see `package.json` for all `npm run dev` variations)<br/>

**IMPORTANT** development mode uses `swc` for performance reasons which DOES NOT check for typescript errors. Run `npm run type-check` to check for type errors. NOTE: you should use your IDE to prevent most type errors.

### `npm test`

Run unit-tests with <a href="https://vitest.dev/guide/">vitest</a>.

### `npm run lint`

Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm run type-check`

Check for typescript errors.

## Additional Notes

- If `npm run dev` gives you issues with bcrypt on MacOS you may need to run: `npm rebuild bcrypt --build-from-source`.
