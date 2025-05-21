import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import GradientBackground from '../componentes/GradientBackground';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Usuario local simulado
  const LOCAL_USER = {
    email: 'estefano.ochoa@cun.edu.co',
    password: '12345678a',
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa email y contraseña');
      return;
    }

    if (email === LOCAL_USER.email && password === LOCAL_USER.password) {
      Alert.alert('Login exitoso');
      navigation.replace('HomeTabs'); // o la pantalla a la que quieras ir después del login
    } else {
      Alert.alert('Error', 'Email o contraseña incorrectos');
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#ccc"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#ccc"
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
            <Text style={styles.buttonText}>🔥 Iniciar sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => Alert.alert('Registro deshabilitado')}
          >
            <Text style={styles.buttonText}>✒️ Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },

  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontFamily: 'Saira-Bold',
    backgroundColor: 'white',
    borderColor: 'gray',
    color: 'black',
  },
  buttonsContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonLogin: {
    backgroundColor: '#432371',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 12,
  },
  buttonRegister: {
    backgroundColor: '#432371',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Saira-Italic',
    textAlign: 'center',
  },
});
