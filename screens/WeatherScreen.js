import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import GradientBackground from '../componentes/GradientBackground';

const WeatherScreen = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ca6edbca4c91044fe1c5b247fe871354&units=metric&lang=es`
      );
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      console.error('Error al obtener el clima', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCitySuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=ca6edbca4c91044fe1c5b247fe871354&units=metric&lang=es`
      );
      const data = await res.json();
      setSuggestions(data.list || []);
    } catch (error) {
      console.error('Error al obtener las sugerencias', error);
    }
  };

  const handleCityChange = (text) => {
    setCity(text);
    fetchCitySuggestions(text);
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>☀️ Consulta el Clima</Text>

        <TextInput
          style={styles.input}
          placeholder="Ingresa una ciudad"
          value={city}
          onChangeText={handleCityChange}
          keyboardType="default"
          autoCorrect={false}
          autoCapitalize="words"
        />

        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id?.toString() || item.name} 
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestion}
                onPress={() => {
                  setCity(item.name);
                  setSuggestions([]);
                }}
              >
                <Text>{item.name}, {item.sys?.country}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        <View style={styles.refreshButtonContainer}>
          <Text
            style={styles.ButtonClima}
            onPress={fetchWeather}
          >
            🌥️ Buscar clima
          </Text>
        </View>

        {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

        {weather && weather.main && (
          <View style={styles.card}>
            <Text style={styles.city}>{weather.name}</Text>
            <Text style={styles.temp}>{weather.main.temp}°C</Text>
            <Text>{weather.weather?.[0]?.description || ''}</Text>
          </View>
        )}
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'Saira-Bold',
    
  },
  fontSize: 18,
  fontWeight: '600',
  marginBottom: 8,
  color: '#fff',
 
  marginBottom: 10,
  marginTop: 10,

  
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    fontFamily: 'Saira-Bold',
  },
  card: {
    marginTop: 30,
    backgroundColor: '#ffffffdd',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  suggestion: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    borderRadius: 8,
  },
  refreshButtonContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  ButtonClima: {
    backgroundColor: '#432371',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    fontSize: 16,
    fontFamily: 'Saira-Bold',
    overflow: 'hidden',
    marginBottom: 12,
   
  },
});

export default WeatherScreen;