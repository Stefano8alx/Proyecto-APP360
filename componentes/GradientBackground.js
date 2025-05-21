
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={['#1f1c2c', '#928dab']}
      style={styles.gradient}
    >
      <View style={styles.content}>
        {children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
  },
});

export default GradientBackground;
