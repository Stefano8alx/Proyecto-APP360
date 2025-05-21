import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GradientBackground from '../componentes/GradientBackground';
import { Image } from 'react-native';




export default function WelcomeScreen({ navigation }) {

  return (
    <GradientBackground>
      <Image source={require('../assets/welcome.png')} style={styles.logo} />
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a MiDía360!</Text>
      <Text style={styles.subtitle}>Tu clima, horóscopo y noticias en un solo lugar.</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Empezar</Text>
      </TouchableOpacity>
    </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
   
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  title: {
    fontSize: 32,
    color: '#432371',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Saira-Bold',
    padding: 5,

  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Saira-Italic',

  },
  button: {
    backgroundColor: '#432371',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Saira-Bold',
  },
  logo: {
   
    width: 310,
    height: 350,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 50,
    marginBottom: 20,
  },
});
