import React, { useState, useMemo } from 'react';
import { ToolCategory, ToolItem } from './types';
import { TOOLS_DATA } from './data/toolsData';
import { Header } from './components/Header';
import { ToolCard } from './components/ToolCard';
import { UsageModal } from './components/UsageModal';
import { WorkflowSection } from './components/WorkflowSection';
import { Footer } from './components/Footer';
import { SearchX, Sparkles, Filter } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalTool, setActiveModalTool] = useState<ToolItem | null>(null);

  // Filter tools based on Category and Search Query
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      // 1. Category Matching
      const matchesCategory =
        selectedCategory === '전체' ||
        tool.category === selectedCategory ||
        (tool.secondaryCategories && tool.secondaryCategories.includes(selectedCategory as any));

      if (!matchesCategory) return false;

      // 2. Search Query Matching
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      const nameMatch = tool.name.toLowerCase().includes(query);
      const englishMatch = tool.englishName?.toLowerCase().includes(query) ?? false;
      const taglineMatch = tool.tagline.toLowerCase().includes(query);
      const categoryMatch = tool.category.toLowerCase().includes(query);
      const secondaryCategoryMatch =
        tool.secondaryCategories?.some((cat) => cat.toLowerCase().includes(query)) ?? false;
      const featureMatch = tool.features.some((feat) => feat.toLowerCase().includes(query));
      const summaryMatch = tool.summary.toLowerCase().includes(query);

      return (
        nameMatch ||
        englishMatch ||
        taglineMatch ||
        categoryMatch ||
        secondaryCategoryMatch ||
        featureMatch ||
        summaryMatch
      );
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenModal = (tool: ToolItem) => {
    setActiveModalTool(tool);
  };

  const handleCloseModal = () => {
    setActiveModalTool(null);
  };

  const handleResetFilters = () => {
    setSelectedCategory('전체');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Header with Title, Description, Search, and Category Filter */}
      <Header
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={TOOLS_DATA.length}
        filteredCount={filteredTools.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Results Header Info Bar */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200/80">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm sm:text-base font-bold text-slate-800">
              {selectedCategory === '전체' ? '전체 도구 목록' : `${selectedCategory} 도구`}
            </h2>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100/70 text-blue-700">
              {filteredTools.length}개
            </span>
          </div>

          {(selectedCategory !== '전체' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-slate-500 hover:text-blue-600 font-medium cursor-pointer transition-colors"
            >
              전체 보기로 리셋
            </button>
          )}
        </div>

        {/* Tools Grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
        {filteredTools.length > 0 ? (
          <div
            id="tools-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onOpenModal={handleOpenModal} />
            ))}
          </div>
        ) : (
          /* Empty Search/Filter State */
          <div
            id="empty-results-state"
            className="my-12 text-center p-8 sm:p-12 bg-white rounded-2xl border border-dashed border-slate-300 max-w-md mx-auto"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
              <SearchX className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              검색 결과가 없습니다
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              '{searchQuery}'에 해당하는 도구를 찾을 수 없습니다. 다른 검색어나 카테고리를 선택해보세요.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-2xs cursor-pointer"
            >
              전체 도구 보기
            </button>
          </div>
        )}

        {/* Bottom AI Video Workflow Pipeline Section */}
        <WorkflowSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Step-by-Step Usage Guide Modal */}
      <UsageModal tool={activeModalTool} onClose={handleCloseModal} />
    </div>
  );
}
