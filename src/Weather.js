import React from "react";
import WeatherDay from "./WeatherDay";

class Weather extends React.Component {

  render() {
    return (
      <>
        {this.props.weatherData.map((e) => {
          return (
            <WeatherDay
                date={e.date}
                description={e.description}
              />
          )
        })}
      </>
    )
  }
}

export default Weather;