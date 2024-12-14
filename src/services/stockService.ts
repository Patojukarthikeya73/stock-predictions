import axios from 'axios';

const exampleAPIUrl = 'https://api.example.com/stocks';

export const fetchStockData = async () => {
  try {
    const response = await axios.get(`${exampleAPIUrl}/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

export const getStockDetails = async (stockId: string) => {
  try {
    const response = await axios.get(`${exampleAPIUrl}/details/${stockId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock details:', error);
    throw error;
  }
};
