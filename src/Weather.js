import React from "react";
import Card from "react-bootstrap/Card";


class Weather extends React.Component {

  render() {
    return (
      <>
        {this.props.weatherData.map((e, idx) => {
          return (
            <Card style={{ width: '18rem' }} key = {idx}>
              <Card.Body>
                <Card.Title>Date: {e.date}</Card.Title>
                <Card.Text>Weather: {e.description}</Card.Text>
              </Card.Body>
            </Card>
          )
        })}
      </>
    )
  }
}

export default Weather;