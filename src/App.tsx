import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { BriefView } from './components/BriefView';
import { ClientsView } from './components/ClientsView';
import { MeetingsView } from './components/MeetingsView';
import { AlertsView } from './components/AlertsView';
import { SettingsView } from './components/SettingsView';
import { AgentWorkflow } from './components/AgentWorkflow';
import { Search, Plus, Calendar, Filter, ChevronRight, Clock, UserPlus, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [brief, setBrief] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pendingBrief, setPendingBrief] = useState<any>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setBrief(null); // Clear current brief if any
    try {
      const response = await fetch('/api/generate-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: 'C-12345' }),
      });
      const data = await response.json();
      setPendingBrief(data);
    } catch (error) {
      console.error('Failed to generate brief:', error);
      setIsGenerating(false);
    }
  };

  const onWorkflowComplete = () => {
    setBrief(pendingBrief);
    setIsGenerating(false);
  };

  const renderView = () => {
    switch (activeView) {
      case 'clients': return <ClientsView />;
      case 'meetings': return <MeetingsView />;
      case 'alerts': return <AlertsView />;
      case 'settings': return <SettingsView />;
      default: return (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Relationship Manager Portal</h2>
              <p className="text-gray-500 mt-1">Welcome back, James. You have 3 meetings scheduled for today.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-black/10 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                <Filter size={16} />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#111827] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
                <Plus size={16} />
                New Meeting
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Left Column: Meeting List */}
            <div className="col-span-4 space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Today's Schedule</h3>
              
              {[
                { name: 'Alistair Montgomery-Smythe', time: '10:00 AM', type: 'Portfolio Review', status: 'ready' },
                { name: 'Elena Rodriguez', time: '02:30 PM', type: 'Estate Planning', status: 'pending' },
                { name: 'Dr. Marcus Chen', time: '04:00 PM', type: 'New Investment Strategy', status: 'none' },
              ].map((meeting, idx) => (
                <div 
                  key={idx}
                  onClick={() => meeting.status !== 'none' && handleGenerate()}
                  className={`p-4 rounded-xl border transition-all cursor-pointer group ${
                    meeting.status === 'ready' 
                      ? 'bg-white border-orange-500/50 shadow-md ring-1 ring-orange-500/10' 
                      : 'bg-white border-black/5 hover:border-black/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      <Clock size={12} />
                      {meeting.time}
                    </div>
                    {meeting.status === 'ready' && (
                      <div className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 rounded text-[10px] font-bold uppercase">Brief Ready</div>
                    )}
                    {meeting.status === 'pending' && (
                      <div className="px-2 py-0.5 bg-amber-500/10 text-amber-600 rounded text-[10px] font-bold uppercase">Processing...</div>
                    )}
                  </div>
                  <h4 className="font-bold text-[#111827] group-hover:text-orange-600 transition-colors">{meeting.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{meeting.type}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200" />
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-300" />
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-500 transition-colors" />
                  </div>
                </div>
              ))}

              <button className="w-full py-3 border-2 border-dashed border-black/10 rounded-xl text-sm font-medium text-gray-400 hover:border-black/20 hover:text-gray-600 transition-all flex items-center justify-center gap-2">
                <UserPlus size={16} />
                Add Client to Queue
              </button>
            </div>

            {/* Right Column: Brief Preview */}
            <div className="col-span-8">
              {isGenerating ? (
                <AgentWorkflow onComplete={onWorkflowComplete} />
              ) : brief ? (
                <BriefView data={brief} />
              ) : (
                <div className="h-[600px] bg-white rounded-xl border border-dashed border-black/10 flex flex-col items-center justify-center text-center p-12">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <Briefcase size={32} className="text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-400">No Brief Selected</h3>
                  <p className="text-gray-400 mt-2 max-w-sm">
                    Select a meeting from your schedule to view the AI-Powered Expert briefing or generate a new one.
                  </p>
                  <button 
                    onClick={handleGenerate}
                    className="mt-8 px-6 py-3 bg-[#111827] text-white rounded-lg font-medium hover:bg-black transition-colors"
                  >
                    Generate Sample Brief
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans text-[#111827]">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-black/5 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search clients, portfolios, or meeting notes..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Calendar size={20} />
            </button>
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-xs">
              JD
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
