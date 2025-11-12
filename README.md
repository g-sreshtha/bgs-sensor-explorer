# bgs-sensor-explorer

A web application for visualising sensor data from the British Geological Survey's environmental monitoring network.

## Project Structure
```
bgs-sensor-explorer/
├── src/
│   ├── components/
│   │   ├── listOfFeaturesDropdown.tsx      # Feature selection dropdown
│   │   ├── listOfDatastreamsDropdown.tsx   # Datastream selection dropdown
│   │   ├── statisticsDisplay.tsx           # Stats cards component
│   │   └── observationsChart.tsx           # Time series chart
│   ├── api.ts                               # API client and types
│   ├── App.tsx                              # Main application component
│   ├── App.css                              # Application styles
│   └── main.tsx                             # Application entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```
### Stats

The app calculates four key metrics for each datastream:

- **Count**: Number of observations in the dataset
- **Min**: Lowest recorded value
- **Max**: Highest recorded value
- **Mean**: Average value over the time period

These metrics are essential for environmental monitoring and identifying trends or anomalies.

## Use

1. **Select a Feature of Interest**
   - Choose from the dropdown list of sensor locations
   - Each feature represents a physical monitoring site

2. **Choose a Datastream**
   - After selecting a feature, available measurement types appear
   - Examples: Water Level (m), Temperature (°C), CO2 (%)

3. **Analyze the Data**
   - View statistics cards showing min, max, mean, and count
   - Examine the time series chart for trends and patterns
   - Observations are automatically sorted chronologically


## Future Enhancements
- Client side caching: With long waiting/ stalling API calls, this would store frequently fetched data which will avoid redundant API calls and increase the speed of data retrieval
- Date Range Selector: This would allow users to specify custom time windows for stats and graphs
- Map selector for Feature of Interest: Having a map to select the features may help user experience due to the count of feature of interests. 
- Multistream comparison: This will allow a user to overlay datastreams for comparison.