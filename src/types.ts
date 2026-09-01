export type ToolCategory =
  | '전체'
  | 'AI 영상 생성'
  | '영상 편집'
  | '이미지 생성'
  | 'AI 음성'
  | 'AI 아바타'
  | '자막';

export type DifficultyLevel = '초급' | '중급' | '고급';

export interface ToolItem {
  id: string;
  name: string;
  englishName?: string;
  category: Exclude<ToolCategory, '전체'>;
  secondaryCategories?: Exclude<ToolCategory, '전체'>[];
  tagline: string;
  features: [string, string, string];
  difficulty: DifficultyLevel;
  websiteUrl: string;
  iconName: string;
  badgeColor: {
    bg: string;
    text: string;
    border: string;
  };
  summary: string;
  steps: string[];
  tips?: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  recommendedTools: string[];
  icon: string;
}
