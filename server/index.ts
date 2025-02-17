import dotenv from 'dotenv';
// 환경변수 로드를 가장 먼저 실행
dotenv.config({ path: './.env' });

import express, { Request, Response } from 'express';
import cors from 'cors';
import weatherRouter from './Router/Weather';

// 환경변수 확인
console.log('Server starting...');
console.log('Current directory:', process.cwd());
console.log('Loaded API Key:', process.env.OPENWEATHER_API_KEY);

const app = express();
const port = process.env.PORT || 4000;

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우트
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API is working!' });
});
app.use('/weather', weatherRouter);


// 예시 API 엔드포인트
app.get('/api/users', (req: Request, res: Response) => {
  res.json([
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' }
  ]);
});

app.post('/api/users', (req: Request, res: Response) => {
  const { name } = req.body;
  // 여기서 데이터베이스 작업을 수행할 수 있습니다
  res.json({ message: 'User created', name });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});