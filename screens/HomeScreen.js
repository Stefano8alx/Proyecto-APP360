import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import GradientBackground from '../componentes/GradientBackground'; 

export default function HomeScreen() {
  const [topCoins, setTopCoins] = useState([]);
  const [btcPrice, setBtcPrice] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000); 
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Precio actual BTC
      const priceRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const priceJson = await priceRes.json();
      if (priceJson?.bitcoin?.usd) {
        setBtcPrice(priceJson.bitcoin.usd);
      } else {
        console.warn('Formato de datos incorrecto para precio de Bitcoin');
        setBtcPrice(null);
      }

      // Top 10 criptos
      const marketRes = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1');
      const marketJson = await marketRes.json();
      if (Array.isArray(marketJson)) {
        setTopCoins(marketJson);
      } else {
        console.warn('Formato de datos incorrecto para top coins');
        setTopCoins([]);
      }

      setLastUpdate(new Date());

    } catch (error) {
      console.error('Error al obtener datos:', error);
      setError('No se pudieron cargar los datos. Intente nuevamente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (  
    <GradientBackground>
      <ScrollView style={styles.container}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.header}>
          <Text style={styles.title}>💰 Precio de Bitcoin (USD)</Text>
          {btcPrice !== null ? (
            <Text style={styles.price}>${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          ) : (
            <ActivityIndicator size="large" color="#f7931a" />
          )}
          {lastUpdate && (
            <Text style={styles.timestamp}>
              Última actualización: {lastUpdate.toLocaleTimeString()} 
            </Text>
          )}

          <View style={styles.refreshButtonContainer}>
            <Text 
              style={styles.refreshButton} 
              onPress={fetchData}
            >
              🔄 Actualizar
            </Text>
          </View>
        </View>

        <Text style={styles.subtitle}>📈 Top 10 Criptomonedas</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#f7931a" style={styles.loader} />
        ) : topCoins.length > 0 ? (
          <View style={styles.coinsContainer}>
            {topCoins.map((item) => (
              <View key={item.id} style={styles.coinItem}>
                <Image source={{ uri: item.image }} style={styles.coinLogo} />
                <View style={styles.coinInfo}>
                  <Text style={styles.coinName}>{item.name} ({item.symbol.toUpperCase()})</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.coinPrice}>${item.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                    <Text style={[styles.priceChange, { color: item.price_change_percentage_24h >= 0 ? '#16c784' : '#ea3943' }]}>
                      {item.price_change_percentage_24h >= 0 ? '+' : ''}{item.price_change_percentage_24h.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noDataText}>No se pudieron cargar las criptomonedas</Text>
        )}
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  
  },
  header: {
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 20,

    
  },
  title: {
    fontSize: 26,
    fontFamily: 'Saira-Bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,

  },
 
  
  price: {
    fontSize: 32,
    fontFamily: 'Saira-Bold',
    color: '#f7931a',
    textAlign: 'center',
  },
  timestamp: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  refreshButtonContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  refreshButton: {
    backgroundColor: '#432371',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    fontSize: 16,
    fontFamily: 'Saira-Bold',
    overflow: 'hidden',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Saira-Bold',
    marginBottom: 15,
    color: '#fff',
  },
  coinsContainer: {
    marginBottom: 20,
  },
  coinItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
  },
  coinLogo: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  coinInfo: {
    flex: 1,
  },
  coinName: {
    fontSize: 16,
    fontFamily: 'Saira-Bold',
    color: '#fff',
    marginBottom: 5,
  },
  coinPrice: {
    fontSize: 16,
    fontFamily: 'Saira-Bold',
    color: '#eee',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceChange: {
    fontSize: 14,
    fontFamily: 'Saira-Bold',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  noDataText: {
    textAlign: 'center',
    color: '#ddd',
    marginVertical: 20,
  },
  loader: {
    marginVertical: 30,
  },
});
