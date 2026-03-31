import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, PieChart, TrendingUp, User, ShieldCheck, Info, ThumbsUp, ThumbsDown, Edit3, RefreshCw, ChevronRight } from 'lucide-react';
import { ConfidenceBadge } from './ConfidenceBadge';

interface BriefSection {
  content: string;
  confidence: number;
  citations: string[];
}

interface BriefData {
  id: string;
  clientName: string;
  overallConfidence: number;
  sections: {
    summary: BriefSection;
    portfolio: BriefSection;
    market: BriefSection;
    client: BriefSection;
    compliance: BriefSection;
  };
}

export const BriefView = ({ data }: { data: BriefData }) => {
  const [activeTab, setActiveTab] = useState<keyof BriefData['sections']>('summary');

  const tabs = [
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
    { id: 'market', label: 'Market', icon: TrendingUp },
    { id: 'client', label: 'Client', icon: User },
    { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-[#F9FAFB] border-b border-black/5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-[#111827]">{data.clientName}</h2>
            <ConfidenceBadge score={data.overallConfidence} />
          </div>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            Meeting Brief Generated • {new Date().toLocaleDateString()} • APEX v1.0
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-black/10 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <RefreshCw size={16} />
            Regenerate
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111827] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
            Export PDF
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-black/5 px-6 bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-3xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#111827] uppercase tracking-tight">
                {activeTab} Analysis
              </h3>
              <div className="flex items-center gap-4">
                <ConfidenceBadge score={data.sections[activeTab].confidence} />
                <div className="flex gap-1">
                  <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors">
                    <ThumbsUp size={16} />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors">
                    <ThumbsDown size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-orange-500/20 rounded-full" />
              <p className="text-lg leading-relaxed text-[#374151] font-serif italic">
                "{data.sections[activeTab].content}"
              </p>
              <button className="absolute -right-10 top-0 opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-[#111827] transition-all">
                <Edit3 size={18} />
              </button>
            </div>

            {/* Citations */}
            <div className="mt-12 pt-8 border-t border-black/5">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Info size={14} />
                Source Citations
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {data.sections[activeTab].citations.map((citation, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-gray-600 group cursor-pointer hover:text-[#111827]">
                    <span className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded text-[10px] font-bold text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                      {idx + 1}
                    </span>
                    {citation}
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>

            {/* Review Overlay for Low Confidence */}
            {data.sections[activeTab].confidence < 75 && (
              <div className="mt-8 p-4 bg-rose-50 border border-rose-100 rounded-lg flex gap-3">
                <ShieldCheck className="text-rose-500 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-rose-900">Human Review Required</p>
                  <p className="text-xs text-rose-700 mt-0.5">
                    This section has been flagged due to low confidence scores in source cross-referencing. Please verify against SimCorp before presenting to client.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
