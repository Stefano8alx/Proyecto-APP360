import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import GradientBackground from '../componentes/GradientBackground';
import { API_KEY } from '@env';

export default function NewsScreen() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=bitcoin+OR+mercado+OR+bolsa+OR+criptomonedas&language=es&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`
      );
      const data = await response.json();
      
      if (data.status === 'ok') {
        setNews(data.articles);
        setError(null);
      } else {
        setError(data.message || 'Error al cargar noticias');
        setNews([]);
      }
    } catch (err) {
      setError('Error de conexión');
      console.error(err);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.newsItem} 
      onPress={async () => {
        const supported = await Linking.canOpenURL(item.url);
        if (supported) {
          Linking.openURL(item.url);
        } else {
          alert('No se puede abrir la URL');
        }
      }}
    >
      <Image
        source={item.urlToImage ? { uri: item.urlToImage } : require('../assets/default-news.jpg')}
        style={styles.newsImage}
      />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsSource}>{item.source?.name || 'Fuente desconocida'}</Text>
        <Text style={styles.newsDate}>{new Date(item.publishedAt).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <GradientBackground>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#f7931a" />
        </View>
      </GradientBackground>
    );
  }

  if (error) {
    return (
      <GradientBackground>
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={fetchNews} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.header}>📰 Últimas Noticias </Text>
        <FlatList
          data={news}
          renderItem={renderItem}
          keyExtractor={(item) => item.url}
          refreshing={loading}
          onRefresh={fetchNews}
        />
      </View>
    </GradientBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,  
    
   
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 20,
    fontFamily: 'Saira-Bold',
  },
  newsItem: {
    backgroundColor: '#1e1e2f', 
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden',
  },
  newsImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  newsContent: {
    padding: 15,
  },
  newsTitle: {
    fontSize: 18,
    fontFamily: 'Saira-Bold',
    marginBottom: 8,
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
    marginTop: 10,
    borderColor: 'rgba(176, 18, 18, 0.05)',
  },
  newsSource: {
    fontSize: 13,
    color: '#aaa',
    marginBottom: 2,
  },
  newsDate: {
    fontSize: 12,
    color: '#888',
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#7e57c2',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
