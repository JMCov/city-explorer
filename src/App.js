import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cities from './Cities';
import Weather from './Weather';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: '',
      mapUrl: '',
      isCity: false,
      weatherData: [],
      isWeather: false

    }
  }

  handleInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  getCityData = async (e) => {
    e.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_KEY}&q=${this.state.city}&format=json&limit=1`;
      
      
      let cityDataFromAxios = await axios.get(url)
      
      this.setState({
        cityData: cityDataFromAxios.data,
        error: false,
        isCity: true,
      })
      this.handleWeather();
    } catch (error) {
      
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }
handleWeather = async () => {
  try {
    let weatherData = await axios.get(`${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.city}`);
    console.log(weatherData)
    this.setState({
      weatherData: weatherData.data,
      isWeather: true
      })

  } catch (error) {
    this.setState({
    error: true,
    errorMessage: error.message
    })
  }
}

  render() {
    console.log(this.state)
    return (
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.getCityData}>
          <label htmlFor=""> Pick a City!
            <input type="text" onInput={this.handleInput} />
            <button type='submit'>Explore!</button>
          </label>
        </form>
        <main>
        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            : <div>
                <Cities
                 cityData={this.state.cityData}
                 />
                 <Weather 
                 weatherData={this.state.weatherData}
                 />
             </div>
        }
        </main>
      </>
    )
  }
}

export default App;
