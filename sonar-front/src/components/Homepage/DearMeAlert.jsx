import { useState, useRef } from "react";
import { createPortal } from "react-dom";

const DearMeAlert = ({ isOpen, onClose, letter, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const modalBackground = useRef();

  if (!isOpen) return null;

  const formatDate = (date) => {
    return date?.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBackgroundClick = (e) => {
    if (e.target === modalBackground.current) {
      if (showDeleteConfirm) {
        setShowDeleteConfirm(false);
      } else {
        onClose();
      }
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(letter.id);
    setShowDeleteConfirm(false);
    onClose();
  };

  // 첫 번째 모달 (미래 편지 안내)
  const firstModal = (
    <div ref={modalBackground} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" onClick={handleBackgroundClick}>
      <div className="w-full max-w-[320px] sm:max-w-[400px] bg-zinc-900 rounded-[32px] overflow-hidden">
        <div className="px-6 pt-8 pb-6 sm:pt-12 sm:pb-8">
          <h2 className="text-xl font-bold text-center mb-2 sm:mb-3 text-white">아직 열람할 수 없는 편지예요</h2>
          <p className="text-zinc-400 text-center">{formatDate(letter?.openDate)}에 열어볼 수 있어요</p>
        </div>

        <div className="flex items-center gap-3 px-6 pb-6 sm:pb-8">
          <button onClick={onClose} className="flex-1 py-4 bg-zinc-800 text-zinc-400 font-medium rounded-2xl">
            돌아가기
          </button>
          <button onClick={handleDelete} className="flex-1 py-4 bg-white text-black font-medium rounded-2xl">
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );

  // 두 번째 모달 (삭제 확인)
  const secondModal = (
    <div ref={modalBackground} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" onClick={handleBackgroundClick}>
      <div className="w-full max-w-[320px] sm:max-w-[400px] bg-zinc-900 rounded-[32px] overflow-hidden">
        <div className="px-6 pt-8 pb-6 sm:pt-12 sm:pb-8">
          <h2 className="text-xl font-bold text-center mb-2 sm:mb-3 text-white">정말 삭제하시겠어요?</h2>
          <p className="text-zinc-400 text-center">
            {formatDate(letter?.openDate)}에 열어볼 편지예요.
            <br />
            삭제하면 다시 복구할 수 없어요.
          </p>
        </div>

        <div className="flex items-center gap-3 px-6 pb-6 sm:pb-8">
          <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-4 bg-zinc-800 text-zinc-400 font-medium rounded-2xl">
            취소
          </button>
          <button onClick={handleConfirmDelete} className="flex-1 py-4 bg-white text-black font-medium rounded-2xl">
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );

  const modal = showDeleteConfirm ? secondModal : firstModal;

  return createPortal(modal, document.getElementById("modal-root"));
};

export default DearMeAlert;
