import React, { useState } from 'react';
import axios from 'axios';
import { fetchWeatherApi } from 'openmeteo';
import WaveModel from '../Models/Model';


const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

const App: React.FC = () => {
  const [startDate, setSDate] = useState<string>('');
  const [endDate, setEDate] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WaveModel>(new WaveModel() );
  const [indicator, setIndicator] = useState<boolean>(false);

  const fetchData = async () => {

       try {
      const response = await axios.get(`https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&hourly=wave_height&start_date=${startDate}&end_date=${endDate}`)
      //setWeatherData(response.data);
      setWeatherData({
        hourly: response.data.hourly
    });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderIndicators = () => {
    setIndicator(true)
  };

  return (
    <div>
      <h1>Marine Weather App</h1>
      <div>
        <label>Start Date: </label>
        <input type="date" value={startDate} onChange={(e) => setSDate(e.target.value)} />
        <label>End Date: </label>
        <input type="date" value={endDate} onChange={(e) => setEDate(e.target.value)} />
      </div>
      <div>
        <label>Location: </label>
        <input type="string" value={latitude} placeholder="Latitude" onChange={(e) => setLatitude(e.target.value)} />
        <input type="string" value={longitude} placeholder="Longitude" onChange={(e) => setLongitude(e.target.value)} />
      </div>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={renderIndicators}>Indicators Data</button>
    
      {weatherData && (
        <>
      <table className="table">
                <thead>
                  <tr>
                    <th >time</th>
                    <th >wave</th>
                  </tr>
                </thead>
                <tbody>
    {weatherData && weatherData.hourly && weatherData.hourly.time && weatherData.hourly.wave_height
      ? weatherData.hourly.time.map((t: any, index: number) => (
          <tr key={index}>
            <td>{t}</td>
            <td>{weatherData.hourly.wave_height[index]}</td>
          </tr>
        ))
      : null}
  </tbody>
              </table>
              </>
      )}
       {indicator && weatherData && (
        <div>
          <h2>Indicators Data</h2>
          {weatherData.hourly.wave_height.map((wave: number, index: number) => (
            <span key={index} style={{ color: wave <= 0.60 ? 'green' : wave <= 0.120 ? 'yellow' : 'red' }}>
              {wave}
            </span>
          ))}
        </div>
      )}


    </div>
  );
};

export default App;
