import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: ''

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
      // TODO: need use axios to hit LocationIQ - async/await
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_KEY}&q=${this.state.city}&format=json`

      console.log(url);
      let cityDataFromAxios = await axios.get(url)
      console.log(cityDataFromAxios.data)
      // TODO: save that data to state
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false
      })


      //  *** FOR YOUR LAB YOU WILL NEED TO GET A MAP IMAGE SRC. Example: ***
      // ** `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=47.6038321,-122.3300624&zoom=10`

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


        {/* Ternary - W ? T : F */}
        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            : <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>City Information: {this.state.cityData.display_name}</Card.Title>
                  <Card.Text>Latitude: {this.state.cityData.lat}</Card.Text>
                  <Card.Text>Longitude: {this.state.cityData.lon}</Card.Text>
                </Card.Body>
              </Card>
             
        }



      </>
    )

  }



}



export default App;
