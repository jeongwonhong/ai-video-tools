import React from 'react';
import {
  ExternalLink,
  BookOpenText,
  Sparkles,
  CheckCircle,
  Subtitles,
  Video,
  Palette,
  Film,
  Clapperboard,
  Tv,
  Image as ImageIcon,
  UserCheck,
  Users,
  Mic,
  Volume2,
  HelpCircle,
} from 'lucide-react';
import { ToolItem } from '../types';

interface ToolCardProps {
  tool: ToolItem;
  onOpenModal: (tool: ToolItem) => void;
}

// Icon helper
const getToolIcon = (iconName: string) => {
  const iconProps = { className: 'w-5 h-5' };
  switch (iconName) {
    case 'Subtitles':
      return <Subtitles {...iconProps} className="w-5 h-5 text-emerald-600" />;
    case 'Sparkles':
      return <Sparkles {...iconProps} className="w-5 h-5 text-indigo-600" />;
    case 'Video':
      return <Video {...iconProps} className="w-5 h-5 text-sky-600" />;
    case 'Palette':
      return <Palette {...iconProps} className="w-5 h-5 text-cyan-600" />;
    case 'Film':
      return <Film {...iconProps} className="w-5 h-5 text-violet-600" />;
    case 'Clapperboard':
      return <Clapperboard {...iconProps} className="w-5 h-5 text-purple-600" />;
    case 'Tv':
      return <Tv {...iconProps} className="w-5 h-5 text-blue-600" />;
    case 'Image':
      return <ImageIcon {...iconProps} className="w-5 h-5 text-amber-600" />;
    case 'UserCheck':
      return <UserCheck {...iconProps} className="w-5 h-5 text-rose-600" />;
    case 'Users':
      return <Users {...iconProps} className="w-5 h-5 text-pink-600" />;
    case 'Mic':
      return <Mic {...iconProps} className="w-5 h-5 text-emerald-600" />;
    case 'Volume2':
      return <Volume2 {...iconProps} className="w-5 h-5 text-teal-600" />;
    default:
      return <HelpCircle {...iconProps} className="w-5 h-5 text-slate-600" />;
  }
};

const getDifficultyBadge = (difficulty: ToolItem['difficulty']) => {
  switch (difficulty) {
    case '초급':
      return {
        label: '난이도: 초급',
        className: 'bg-green-50 text-green-700 border-green-200/80',
      };
    case '중급':
      return {
        label: '난이도: 중급',
        className: 'bg-amber-50 text-amber-700 border-amber-200/80',
      };
    case '고급':
      return {
        label: '난이도: 고급',
        className: 'bg-red-50 text-red-700 border-red-200/80',
      };
  }
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onOpenModal }) => {
  const diffBadge = getDifficultyBadge(tool.difficulty);

  return (
    <div
      id={`tool-card-${tool.id}`}
      className="group flex flex-col justify-between bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:-translate-y-1 hover:shadow-md hover:border-slate-300 transition-all duration-200"
    >
      <div>
        {/* Top Badges & Icon */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-100/80 transition-colors">
              {getToolIcon(tool.iconName)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              {tool.englishName && tool.englishName !== tool.name && (
                <p className="text-xs text-slate-600 font-medium">{tool.englishName}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <span
              className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${tool.badgeColor.bg} ${tool.badgeColor.border}`}
            >
              {tool.category}
            </span>
          </div>
        </div>

        {/* Tagline / One-line Description */}
        <p className="text-sm font-medium text-slate-700 leading-relaxed mb-4 min-h-[40px]">
          {tool.tagline}
        </p>

        {/* Difficulty Pill */}
        <div className="mb-4">
          <span
            className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded border ${diffBadge.className}`}
          >
            {diffBadge.label}
          </span>
        </div>

        {/* 3 Key Features */}
        <div className="space-y-2 mb-6 pt-3 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            주요 기능 3가지
          </p>
          <ul className="space-y-1.5">
            {tool.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5 mt-auto">
        <button
          id={`btn-usage-${tool.id}`}
          type="button"
          onClick={() => onOpenModal(tool)}
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/90 border border-blue-200/70 transition-colors cursor-pointer"
        >
          <BookOpenText className="w-4 h-4" />
          <span>사용법 보기</span>
        </button>

        <a
          id={`btn-site-${tool.id}`}
          href={tool.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 transition-colors"
        >
          <span>공식 사이트</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>
    </div>
  );
};
