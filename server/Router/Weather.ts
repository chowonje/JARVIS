import express from 'express';
import axios from 'axios';
const router = express.Router();

// 실제 라우트 핸들러가 없습니다
const url = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';
const apiKey = process.env.OPENWEATHER_API_KEY;

// 라우트 핸들러 추가
router.get('/', async (req, res) => {
  try {
    // API 키 확인을 위한 로그
    console.log('API Key:', apiKey);
    
    // 서울의 기본 좌표
    const lat = 37.5665;
    const lon = 126.9780;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    console.log('Request URL:', url);  // URL 확인을 위한 로그

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error: any) {
    // 자세한 에러 정보 로깅
    console.error('Error details:', error.response?.data || error.message);
    
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      details: error.response?.data || error.message
    });
  }
});

// 2. 도시 이름으로 날씨 조회
router.get('/city', async (req, res) => {
  try {
    const { city } = req.query;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data by city' });
  }
});

// 3. IP 기반 위치 추정 및 날씨 조회
router.get('/ip', async (req, res) => {
  try {
    // IP 기반 위치 확인 (ipapi.co 사용)
    const ipResponse = await axios.get('https://ipapi.co/json/');
    const { latitude, longitude } = ipResponse.data;
    
    // 위치 기반 날씨 조회
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
    
    res.json({
      location: ipResponse.data,  
      weather: weatherResponse.data
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data by IP' });
  }
});

export default router;