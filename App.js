import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from './src/constant'
import { View, StyleSheet, ActivityIndicator, Text, Animated } from 'react-native'
import WeatherSearch from './src/components/weatherSearch'
import WeatherInfo from './src/components/weatherInfo'


const App = () => {
  const [weatherData, setWeatherData] = useState()
  const [status, setStatus] = useState('')
  const renderComponent = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size="large" />
      case 'success':
        return <WeatherInfo weatherData={weatherData} />
      case 'error':
        return (
          <FadeInView style={styles.fadeInStyle}>
      <Text style={styles.errorText}>
        Ups, sepertinya ada yang tidak beres. Coba masukkan nama kota yang tepat dan kita coba lagi!
      </Text>
    </FadeInView>
        )
      default:
        return
    }
  }
  const FadeInView = (props) => {
    const [fadeAnim] = useState(new Animated.Value(0)); // Mulai dari transparan
  
    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1, 
          duration: 1000, // Durasi animasi
          useNativeDriver: true, // Menambahkan ini
        }
      ).start();
    }, [fadeAnim])
  
    return (
      <Animated.View // Menggunakan komponen Animated.View
        style={{
          ...props.style,
          opacity: fadeAnim, // Mengikat opasitas ke nilai animasi
        }}
      >
        {props.children}
      </Animated.View>
    );
  }
  
  const searchWeather = (location) => {
    setStatus('loading')
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data
        data.visibility /= 1000
        data.visibility = data.visibility.toFixed(2)
        data.main.temp -= 273.15
        data.main.temp = data.main.temp.toFixed(2)
        setWeatherData(data)
        setStatus('success')
      })
      .catch((error) => {
        setStatus('error')
      })
  }

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      <View style={styles.margintTop20}>{renderComponent()}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    
  },
  text: {
    marginTop: 10, textAlign: 'center',},
    
    errorText: {
      color: 'red', 
      fontSize: 16,
    },
    fadeInStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
      padding: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ff4500',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 4.84, 
      elevation: 5, 
    }
    
})

export default App