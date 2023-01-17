import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cities from './Cities';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: '',
      mapUrl: '',
      isCity: false

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
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_KEY}&q=${this.state.city}&format=json&limit=20`;

      console.log(url);
      let cityDataFromAxios = await axios.get(url)
      console.log(cityDataFromAxios)
      this.setState({
        cityData: cityDataFromAxios.data,
        error: false,
        isCity: true,
      })

    } catch (error) {
      console.log(error);
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
            : <Cities
              cityData={this.state.cityData}
            />
        }
        </main>
      </>
    )
  }
}

export default App;
