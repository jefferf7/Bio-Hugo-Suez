
export interface LinkItem {
  label: string;
  url: string;
  category: string;
}

export interface LinkResponse {
  name: string;
  shortDescription: string;
  links: LinkItem[];
  sources: { title: string; uri: string }[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface GeneratedBio {
  content: string;
  hashtags: string[];
  type: 'Professional' | 'Creative' | 'Minimalist';
}
