import React from 'react';
import { Search, X, Sparkles, BookOpen, Layers } from 'lucide-react';
import { ToolCategory } from '../types';
import { CATEGORIES } from '../data/toolsData';

interface HeaderProps {
  selectedCategory: ToolCategory;
  onSelectCategory: (category: ToolCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  filteredCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
}) => {
  return (
    <header className="relative bg-white border-b border-slate-200/80 pt-10 pb-8 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-6xl mx-auto">
        {/* Top Badge & Main Header Text */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs sm:text-sm font-semibold tracking-tight shadow-2xs">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>AI 비디오 크리에이터 가이드</span>
          </div>

          <h1
            id="main-title"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
          >
            AI 영상 제작 & 편집 도구 모음
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            영상 제작부터 편집, 음성, 자막까지 필요한 AI 도구를 한눈에 확인하세요.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <div className="absolute left-4 pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="도구 이름 또는 키워드 검색 (예: Vrew, 영상, 음성, 자막, CapCut...)"
              className="w-full pl-12 pr-12 py-3.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all shadow-inner"
              aria-label="도구 검색"
            />
            {searchQuery && (
              <button
                id="search-clear-btn"
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
                title="검색어 지우기"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search Result Summary Badge */}
          <div className="flex items-center justify-between text-xs text-slate-500 mt-2 px-1">
            <span>
              {searchQuery ? (
                <>
                  <span className="font-semibold text-blue-600">"{searchQuery}"</span> 검색 결과:{' '}
                  <strong className="text-slate-800 font-semibold">{filteredCount}</strong>개
                </>
              ) : (
                <>
                  전체 <strong className="text-slate-800 font-semibold">{totalCount}</strong>개의 AI 도구 수록
                </>
              )}
            </span>
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-slate-500 hover:text-blue-600 underline cursor-pointer"
              >
                초기화
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              카테고리 선택
            </span>
          </div>

          <div
            id="category-nav"
            className="flex flex-wrap items-center gap-2 sm:gap-2.5"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  id={`category-btn-${category}`}
                  onClick={() => onSelectCategory(category)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600 ring-offset-1'
                      : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/90'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
