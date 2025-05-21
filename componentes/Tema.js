import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

const MyDarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#1f1c2c',      // Fondo de toda la app
    card: '#28243D',            // Fondo del header
    text: '#ffffff',            // Texto en header y botones
    primary: '#6C63FF',         // Color de enlaces y botones
    border: '#444',             // Bordes, si los hay
    notification: '#6C63FF',    // Badge por ejemplo
  },
};

export default MyDarkTheme;
