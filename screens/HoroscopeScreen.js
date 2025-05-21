import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

const SIGNS = [
  { name: 'aries', emoji: '♈️' },
  { name: 'taurus', emoji: '♉️' },
  { name: 'gemini', emoji: '♊️' },
  { name: 'cancer', emoji: '♋️' },
  { name: 'leo', emoji: '♌️' },
  { name: 'virgo', emoji: '♍️' },
  { name: 'libra', emoji: '♎️' },
  { name: 'scorpio', emoji: '♏️' },
  { name: 'sagittarius', emoji: '♐️' },
  { name: 'capricorn', emoji: '♑️' },
  { name: 'aquarius', emoji: '♒️' },
  { name: 'pisces', emoji: '♓️' },
];

const HoroscopeScreen = () => {
  const [sign, setSign] = useState('leo');
  const [type, setType] = useState('daily'); 
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(false);

  const getEmoji = () => {
    const match = SIGNS.find((s) => s.name === sign);
    return match?.emoji || '✨';
  };

  const fetchHoroscope = async () => {
    setLoading(true);
    setHoroscope(null);

    const baseUrl = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope`;
    let url = '';

    if (type === 'daily') {
      url = `${baseUrl}/daily?sign=${sign}&day=today`;
    } else {
      url = `${baseUrl}/${type}?sign=${sign}`;
    }

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!res.ok) throw new Error('Error al obtener el horóscopo');

      const data = await res.json();
      const text = data.data.horoscope_data;
      const period =
        type === 'weekly' ? data.data.week :
        type === 'monthly' ? data.data.month :
        null;

      setHoroscope({ text, period });
    } catch (err) {
      console.error('ERROR:', err);
      setHoroscope({ text: 'Error al obtener el horóscopo 😢' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient colors={['#1f1c2c', '#928dab']} style={styles.container}>
          <Text style={styles.title}>🔮 Horóscopo</Text>

          <Text style={styles.label}>Selecciona tu signo:</Text>
          <LinearGradient
            colors={['#2a2a3a', '#3a3a4a']}
            style={styles.pickerBox}
          >
            <Picker
              selectedValue={sign}
              onValueChange={(value) => setSign(value)}
              style={styles.picker}
              dropdownIconColor="#fff"
            >
              {SIGNS.map((s) => (
                <Picker.Item
                  key={s.name}
                  label={`${s.emoji} ${s.name.toUpperCase()}`}
                  value={s.name}
                />
              ))}
            </Picker>
          </LinearGradient>

          <Text style={styles.label}>Tipo de horóscopo:</Text>
          <LinearGradient
            colors={['#2a2a3a', '#3a3a4a']}
            style={styles.pickerBox}
          >
            <Picker
              selectedValue={type}
              onValueChange={(value) => setType(value)}
              style={styles.picker}
              dropdownIconColor="#fff"
            >
              <Picker.Item label="Diario" value="daily" />
              <Picker.Item label="Semanal" value="weekly" />
              <Picker.Item label="Mensual" value="monthly" />
            </Picker>
          </LinearGradient>

          <TouchableOpacity style={styles.button} onPress={fetchHoroscope}>
            <Text style={styles.buttonText}>
              {getEmoji()} Ver horóscopo
            </Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" style={{ marginTop: 30 }} />}

          {horoscope && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                {getEmoji()} {sign.toUpperCase()}
              </Text>
              {horoscope.period && (
                <Text style={styles.periodText}>{horoscope.period}</Text>
              )}
              <Text style={styles.horoscopeText}>{horoscope.text}</Text>
            </View>
          )}
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 120,
    minHeight: '100%',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Saira-Bold',
    textAlign: 'center',
    marginTop: -70,
    color: '#fff',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Saira-Bold',
    marginTop: 10,
    color: '#fff',
  },
  pickerBox: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
  },
  picker: {
    height: 55,
    fontSize: 16,
    paddingHorizontal: 20,
    color: '#fff',
  },
  button: {
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    backgroundColor: '#432371',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Saira-Bold',
    textAlign: 'center',

  },
  card: {
    backgroundColor: '#ffffffdd',
    borderRadius: 16,
    padding: 20,
    marginTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: 'Saira-Bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  periodText: {
    fontSize: 16,
    fontFamily: 'Saira-Bold',
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
  },
  horoscopeText: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'justify',
    color: '#444',
    fontFamily: 'Saira-Italic',
  },
});

export default HoroscopeScreen;
