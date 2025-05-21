import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getCryptoPrice = async (coinId = 'bitcoin', currency = 'usd') => {
  try {
    const response = await axios.get(`${BASE_URL}/simple/price`, {
      params: {
        ids: coinId,
        vs_currencies: currency
      },
      timeout: 5000,
    });

    if (
      response.data &&
      response.data[coinId] !== undefined &&
      response.data[coinId][currency] !== undefined
    ) {
      return response.data[coinId][currency];  // Retornamos solo el precio
    } else {
      console.warn('Formato de datos inesperado en getCryptoPrice');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener precio:', error);
    throw new Error(`Error al obtener precio de ${coinId}: ${error.message}`);
  }
};

export const getGlobalData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/global`, { timeout: 5000 });

    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      console.warn('Formato de datos inesperado en getGlobalData');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener datos globales:', error);
    throw new Error(`Error al obtener datos globales: ${error.message}`);
  }
};

export const getTopCoins = async (currency = 'usd', limit = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: limit,
        page: 1,
      },
      timeout: 5000,
    });

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.warn('Formato de datos inesperado en getTopCoins');
      return [];
    }
  } catch (error) {
    console.error('Error al obtener top monedas:', error);
    throw new Error(`Error al obtener top monedas: ${error.message}`);
  }
};
