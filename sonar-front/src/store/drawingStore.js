// drawingStore.js
import { create } from "zustand";

const useStore = create((set, get) => ({
  // 상태들
  diaries: [],
  letters: [],
  drawingImage: null,
  diaryText: "",
  emotionLabel: "",
  selectedColor: null,
  selectedDate: null, // 선택된 날짜 상태

  // 액션들
  setDrawingImage: (image) => set({ drawingImage: image }),
  setDiaryText: (text) => set({ diaryText: text }),
  setEmotionLabel: (label) => set({ emotionLabel: label }),
  setSelectedColor: (color) => set({ selectedColor: color }),
  setSelectedDate: (date) => {
    console.log("[Store] 날짜 설정:", date);
    set({ selectedDate: date });
  },

  // 폼 초기화 (날짜는 초기화하지 않음)
  resetDiaryForm: () => {
    console.log("[Store] 폼 초기화");
    set({
      drawingImage: null,
      diaryText: "",
      emotionLabel: "",
      selectedColor: null,
      // selectedDate는 초기화하지 않음!
    });
  },

  // 일기 저장
  saveDiary: (date) => {
    const state = get();
    console.log("[Store] 일기 저장 시도, 날짜:", date);
    console.log("[Store] 현재 상태:", {
      selectedColor: state.selectedColor,
      drawingImage: state.drawingImage ? "exists" : "none",
      diaryText: state.diaryText,
      emotionLabel: state.emotionLabel,
    });

    if (!date) {
      console.error("[Store] 저장 실패: 날짜 없음");
      return false;
    }

    if (!state.selectedColor) {
      console.error("[Store] 저장 실패: 색상 없음");
      return false;
    }

    // 새 일기 생성
    const newDiary = {
      diaryId: Date.now(),
      imageUrl: state.drawingImage,
      diaryDate: date,
      diaryContent: state.diaryText,
      color: state.selectedColor,
      hashtag: state.emotionLabel,
    };

    console.log("[Store] 새 일기 생성:", newDiary);

    // 일기 저장
    set((state) => ({
      diaries: [...state.diaries, newDiary],
    }));

    console.log("[Store] 일기 저장 완료");
    return true;
  },

  // 일기 조회
  getDiaryByDate: (date) => {
    const state = get();
    return state.diaries.find((diary) => diary.diaryDate === date);
  },

  // 일기 수정
  updateDiary: (diaryId, updates) => {
    set((state) => ({
      diaries: state.diaries.map((diary) => (diary.diaryId === diaryId ? { ...diary, ...updates } : diary)),
    }));
  },

  // 일기 삭제
  deleteDiary: (diaryId) => {
    set((state) => ({
      diaries: state.diaries.filter((diary) => diary.diaryId !== diaryId),
    }));
  },

  // 전체 데이터 설정
  setDiaries: (diaries) => set({ diaries }),
  setLetters: (letters) => set({ letters }),
}));

export default useStore;
