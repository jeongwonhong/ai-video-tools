import React from 'react';
import {
  Lightbulb,
  Image as ImageIcon,
  Video,
  Mic,
  Subtitles,
  Scissors,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/toolsData';

interface WorkflowSectionProps {
  onSelectCategoryFilter?: (categoryName: string) => void;
}

const getStepIcon = (iconName: string) => {
  const props = { className: 'w-5 h-5' };
  switch (iconName) {
    case 'Lightbulb':
      return <Lightbulb {...props} className="w-5 h-5 text-amber-500" />;
    case 'Image':
      return <ImageIcon {...props} className="w-5 h-5 text-emerald-500" />;
    case 'Video':
      return <Video {...props} className="w-5 h-5 text-indigo-500" />;
    case 'Mic':
      return <Mic {...props} className="w-5 h-5 text-rose-500" />;
    case 'Subtitles':
      return <Subtitles {...props} className="w-5 h-5 text-cyan-500" />;
    case 'Scissors':
      return <Scissors {...props} className="w-5 h-5 text-purple-500" />;
    case 'CheckCircle2':
      return <CheckCircle2 {...props} className="w-5 h-5 text-green-600" />;
    default:
      return <Sparkles {...props} className="w-5 h-5 text-blue-500" />;
  }
};

export const WorkflowSection: React.FC<WorkflowSectionProps> = () => {
  return (
    <section
      id="workflow-section"
      className="mt-16 pt-12 pb-14 border-t border-slate-200/90 bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs"
    >
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step-by-Step Pipeline</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          AI 영상 제작 Workflow
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium mt-2">
          아이디어 기획부터 최종 영상 출력까지, AI 도구를 활용한 표준 제작 파이프라인입니다.
        </p>
      </div>

      {/* Desktop Horizontal Workflow Cards with Arrows */}
      <div className="hidden lg:grid grid-cols-7 gap-2.5 items-stretch">
        {WORKFLOW_STEPS.map((step, idx) => {
          const isLast = idx === WORKFLOW_STEPS.length - 1;
          return (
            <div key={step.step} className="relative flex flex-col">
              <div className="flex-1 bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 flex flex-col justify-between hover:bg-blue-50/40 hover:border-blue-200 transition-colors">
                <div>
                  {/* Step number badge & icon */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                    <div className="p-1 rounded-md bg-white border border-slate-100 shadow-2xs">
                      {getStepIcon(step.icon)}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-[11px] text-slate-600 font-normal leading-relaxed mb-3">
                    {step.description}
                  </p>
                </div>

                {/* Recommended Tools tag list */}
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-600 block mb-1">추천 도구</span>
                  <div className="flex flex-wrap gap-1">
                    {step.recommendedTools.map((toolName, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-semibold"
                      >
                        {toolName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow pointing to next */}
              {!isLast && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-blue-500 bg-white rounded-full p-0.5 border border-blue-200 shadow-2xs">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile & Tablet Responsive Flow (Vertical List with connector line) */}
      <div className="lg:hidden relative space-y-4">
        {WORKFLOW_STEPS.map((step, idx) => {
          const isLast = idx === WORKFLOW_STEPS.length - 1;
          return (
            <div key={step.step} className="relative flex items-start gap-4">
              {/* Timeline Indicator */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {step.step}
                </div>
                {!isLast && (
                  <div className="w-0.5 h-12 bg-blue-200 my-1"></div>
                )}
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-slate-50 border border-slate-200/90 rounded-xl p-4">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    {getStepIcon(step.icon)}
                    <span>{step.title}</span>
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                  {step.description}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/70">
                  <span className="text-[11px] font-bold text-slate-600">추천 도구:</span>
                  {step.recommendedTools.map((toolName, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold"
                    >
                      {toolName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Note */}
      <div className="mt-8 p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <span className="text-base">💡</span>
          <span>
            <strong>크리에이터 팁:</strong> 모든 단계를 한 번에 다 쓰지 않고, <strong>Vrew</strong>나 <strong>CapCut</strong>처럼 올인원 편집기에 원하는 AI 클립만 얹어서 시작하는 것이 가장 효율적입니다.
          </span>
        </div>
      </div>
    </section>
  );
};
