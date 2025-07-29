import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001", // 환경변수 활용
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (필요 시 토큰 삽입 등 가능)
instance.interceptors.request.use(
  (config) => {
    // const token = getToken(); // 예시
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (에러 로깅 등)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("🔥 API Error:", error.response.data);
    } else {
      console.error("🔥 Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
