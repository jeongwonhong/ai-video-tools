import React, { useEffect } from 'react';
import { X, ExternalLink, Lightbulb, CheckCircle2, BookOpen } from 'lucide-react';
import { ToolItem } from '../types';

interface UsageModalProps {
  tool: ToolItem | null;
  onClose: () => void;
}

export const UsageModal: React.FC<UsageModalProps> = ({ tool, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (tool) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tool, onClose]);

  if (!tool) return null;

  return (
    <div
      id="usage-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="usage-modal-content"
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-slate-100 bg-slate-50/80">
          <div className="space-y-1.5 pr-6">
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border ${tool.badgeColor.bg} ${tool.badgeColor.border}`}
              >
                {tool.category}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                난이도: {tool.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600 shrink-0" />
              <span>{tool.name} 핵심 사용 가이드</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">{tool.tagline}</p>
          </div>

          <button
            id="modal-close-btn"
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors shrink-0 cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Summary Box */}
          <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl text-xs sm:text-sm text-blue-900 leading-relaxed font-medium">
            {tool.summary}
          </div>

          {/* Step-by-Step Guide */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              단계별 사용 순서 (Step by Step)
            </h3>

            <ol className="space-y-3">
              {tool.steps.map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0 mt-0.5 shadow-2xs">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                      {step}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Practical Tips */}
          {tool.tips && (
            <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                <span>💡 실전 활용 꿀팁</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-medium pl-6">
                {tool.tips}
              </p>
            </div>
          )}

          {/* Key Features Quick Check */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">핵심 기능 요약</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {tool.features.map((feat, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] sm:text-xs text-slate-700 flex items-start gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            id="modal-footer-close-btn"
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
          >
            닫기
          </button>

          <a
            id="modal-official-site-btn"
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors"
          >
            <span>{tool.name} 공식 사이트 방문</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
