import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cities from './Cities';
import Weather from './Weather';
import Movies from './Movies'


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
      isWeather: false,
      movieData: []

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
      let lat = cityDataFromAxios.data[0].lat;
      let lon = cityDataFromAxios.data[0].lon;
      this.setState({
        cityData: cityDataFromAxios.data,
        error: false,
        isCity: true,
      })
      this.handleWeather(lat, lon);
      this.handleMovie();
    } catch (error) {
      
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }
  handleWeather = async (lat, lon) => {
  // console.log(this.state.cityData);
  try {
    let weatherData = await axios.get(`${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`);
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

handleMovie = async () => {
try {
  let movieData = await axios.get(`${process.env.REACT_APP_SERVER}/movies?city=${this.state.city}`)
  console.log(movieData);
  this.setState({
    movieData: movieData.data
  })
  
} catch (error) {
  this.setState({
    error: true,
    errorMessage: error.message
    })
}

}

  render() {
    
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
                 <Movies
                 movieData={this.state.movieData}
                 />
             </div>
        }
        </main>
      </>
    )
  }
}

export default App;
