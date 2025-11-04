import React from 'react';

interface Article {
  source?: string;
  title: string;
  summary: string;
  url: string;
}

interface NewsCardProps {
  article: Article;
  isExpanded: boolean;
  'data-index'?: number; // Allow data-index to be passed
  onMouseLeave?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, isExpanded, onMouseLeave, ...props }) => {
  return (
    <div 
      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden flex flex-col w-80 md:w-96 flex-shrink-0 select-none"
      aria-expanded={isExpanded}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      <div className="p-6 flex-grow">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">{article.source || 'Unknown Source'}</p>
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 leading-tight pr-2">{article.title}</h3>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-6 w-6 text-slate-400 dark:text-slate-500 transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed pt-2">
              {article.summary}
            </p>
        </div>
      </div>
      <div 
        className="bg-slate-50 dark:bg-slate-700/50 p-4 mt-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 flex items-center"
        >
          Read Full Article
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002 2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default NewsCard;