import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
const WeatherInfo = ({weatherData}) => {
    const { main, weather, visibility, wind } = weatherData
    const temperatureCelsius = main.temp
    const weatherIconUri = `https://openweathermap.org/img/w/${weather[0].icon}.png`
    const weatherDescription = weather[0].description
    const windSpeed = wind.speed
    


    return (
        <View style={styles.marginTop20}>
          <Text style={[styles.temperature, styles.marginTop20]}>{temperatureCelsius}°C</Text>
          
          <View style={[styles.rowContainer, styles.marginTop20]}>
          <Image
            source={{ uri: weatherIconUri }}
            style={styles.weatherIcon}
          />
          <Text style={[styles.text, styles.bold]}>{weatherDescription}</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.text, styles.bold]}>Visibility:</Text>
            <Text style={[styles.text, styles.marginLeft15]}>{visibility} km</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.text, styles.bold]}>Wind Speed:</Text>
            <Text style={[styles.text, styles.marginLeft15]}>{windSpeed} m/s</Text>
          </View>
        </View>
      )
    }
 

const styles = StyleSheet.create({
  marginTop20: {
    marginTop: 20,
  },
  marginLeft15: {
    marginLeft: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
  bold: {
    fontWeight: '700',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperature: {
    fontWeight: '700',
    fontSize: 80,
    textAlign: 'center',
    color: 'green'
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
})

export default WeatherInfo