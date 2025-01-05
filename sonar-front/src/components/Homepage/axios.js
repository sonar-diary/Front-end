import axios from "axios";

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: "api/v1", // API 기본 URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 캘린더 데이터 조회
export const getCalendarData = (year, month) => {
  return instance
    .get(`/calendar/${year}/${month}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("캘린더 데이터 조회 실패:", error);
      throw error;
    });
};
