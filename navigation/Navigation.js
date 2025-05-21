import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MyDarkTheme from '../componentes/Tema';



import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import HoroscopeScreen from '../screens/HoroscopeScreen';
import WeatherScreen from '../screens/WeatherScreen';
import WelcomeScreen from '../screens/WelcomeScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Noticias') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          
          } else if (route.name === 'Horóscopo') {
            iconName = focused ? 'sunny' : 'sunny-outline';
          } else if (route.name === 'Clima') {
            iconName = focused ? 'cloudy' : 'cloudy-outline';
          }
        
          else if (route.name === 'Login') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#f7931a',
        tabBarInactiveTintColor: 'gray',

        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen 
        name="Inicio" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Noticias" 
        component={NewsScreen} 
        options={{ headerShown: false }} 
      />
    
      <Tab.Screen
        name="Horóscopo"
        component={HoroscopeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Clima"
        component={WeatherScreen}
        options={{ headerShown: false }}
      />
     
    </Tab.Navigator>      
  );
}

export default function Navigation() {
  return (
    <NavigationContainer theme={MyDarkTheme}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#28243D',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 22,
          },
        }}
      >
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
       
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        {/* Agrega aquí otras pantallas si quieres, como Chat o Friends */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
  

   
