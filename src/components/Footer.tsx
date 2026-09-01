import React from 'react';
import { BookOpen, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200/90 bg-white py-10 px-4 sm:px-6 text-center text-slate-500">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2 text-slate-800 font-bold text-base">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span>AI 영상 제작 & 편집 도구 모음</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          본 사이트는 AI 영상 제작 입문자와 크리에이터를 위한 교육용 레퍼런스 페이지입니다.
          각 도구의 공식 사이트에서 최신 업데이트와 라이선스 정책을 확인하실 수 있습니다.
        </p>

        <div className="pt-4 text-xs text-slate-500 flex items-center justify-center gap-1">
          <span>AI Video Creator Educational Guide</span>
          <span>•</span>
          <span>© 2026 AI Tools Directory</span>
        </div>
      </div>
    </footer>
  );
};
