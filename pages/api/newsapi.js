import axios from 'axios';
import { parseStringPromise } from 'xml2js'; 

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en');
    const xmlData = response.data;
    const jsonData = await parseStringPromise(xmlData, { explicitArray: false }); // Parse XML to JSON
    res.status(200).json(jsonData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
