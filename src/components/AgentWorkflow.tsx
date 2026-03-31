import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  PieChart, 
  TrendingUp, 
  UserCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  ArrowRight,
  Search,
  Database,
  ShieldAlert,
  Activity
} from 'lucide-react';
import { ConfidenceBadge } from './ConfidenceBadge';

interface AgentStep {
  id: string;
  name: string;
  icon: any;
  status: 'pending' | 'running' | 'completed' | 'error';
  message: string;
  output?: string;
}

export const AgentWorkflow = ({ onComplete }: { onComplete: () => void }) => {
  const [steps, setSteps] = useState<AgentStep[]>([
    { id: 'orchestrator_plan', name: 'Master Orchestrator', icon: Cpu, status: 'running', message: 'Parsing meeting trigger & decomposing tasks...' },
    { id: 'portfolio', name: 'Portfolio Analyst', icon: PieChart, status: 'pending', message: 'Waiting for dispatch...' },
    { id: 'market', name: 'Market Intelligence', icon: TrendingUp, status: 'pending', message: 'Waiting for dispatch...' },
    { id: 'memory', name: 'Client Memory', icon: UserCircle, status: 'pending', message: 'Waiting for dispatch...' },
    { id: 'suitability', name: 'Suitability Agent', icon: ShieldCheck, status: 'pending', message: 'Waiting for data aggregation...' },
    { id: 'validator', name: 'Validator Agent', icon: ShieldAlert, status: 'pending', message: 'Waiting for final draft...' },
  ]);

  useEffect(() => {
    const runWorkflow = async () => {
      // 1. Orchestrator Planning
      await new Promise(r => setTimeout(r, 1500));
      updateStep('orchestrator_plan', 'completed', 'Task decomposition complete. Dispatching sub-agents...');
      
      // 2. Parallel Sub-Agents
      updateStep('portfolio', 'running', 'Connecting to SimCorp Dimension REST API...');
      updateStep('market', 'running', 'Ingesting Bloomberg B-PIPE streaming feeds...');
      updateStep('memory', 'running', 'Querying Salesforce FSC & DMS transcripts...');
      
      await new Promise(r => setTimeout(r, 2000));
      updateStep('portfolio', 'completed', 'Holdings & performance attribution retrieved (MTD: +2.4%).');
      updateStep('market', 'completed', 'Macro narratives synthesized for Luxury & Tech sectors.');
      updateStep('memory', 'completed', 'Relationship context & life events extracted.');

      // 3. Suitability Agent
      updateStep('suitability', 'running', 'Cross-referencing against IPS v4.2 & T24 risk profile...');
      await new Promise(r => setTimeout(r, 1500));
      updateStep('suitability', 'completed', 'Suitability check complete. 1 concentration flag generated.');

      // 4. Validator Agent
      updateStep('validator', 'running', 'Executing hallucination detection & tone analysis...');
      await new Promise(r => setTimeout(r, 1500));
      updateStep('validator', 'completed', 'Validation passed. Confidence score: 88/100.');

      await new Promise(r => setTimeout(r, 1000));
      onComplete();
    };

    runWorkflow();
  }, []);

  const updateStep = (id: string, status: AgentStep['status'], message: string) => {
    setSteps(prev => prev.map(step => step.id === id ? { ...step, status, message } : step));
  };

  return (
    <div className="h-[600px] bg-[#0B0C10] rounded-xl border border-white/10 overflow-hidden flex flex-col font-mono">
      {/* Terminal Header */}
      <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        </div>
        <div className="text-[10px] text-white/40 uppercase tracking-widest">APEX Agentic Trace // Session: {Math.random().toString(36).substring(7)}</div>
      </div>

      <div className="flex-1 p-8 grid grid-cols-12 gap-8 overflow-y-auto">
        {/* Left: Master Orchestrator Visualization */}
        <div className="col-span-4 space-y-6">
          <div className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
              <Cpu size={48} className="text-orange-500" />
            </div>
            <h3 className="text-orange-500 font-bold text-sm mb-4 flex items-center gap-2">
              <Activity size={14} className="animate-pulse" />
              MASTER ORCHESTRATOR
            </h3>
            <div className="space-y-3">
              <div className="text-[10px] text-white/60">MODEL: GPT-4o (Primary)</div>
              <div className="text-[10px] text-white/60">STRATEGY: ReAct (Reasoning + Acting)</div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-4">
                <motion.div 
                  className="h-full bg-orange-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 8 }}
                />
              </div>
            </div>
          </div>

          <div className="p-4 border border-white/5 rounded-xl bg-white/2">
            <h4 className="text-[10px] font-bold text-white/40 uppercase mb-3">Active Sub-Agents</h4>
            <div className="space-y-2">
              {steps.slice(1, 4).map(step => (
                <div key={step.id} className="flex items-center justify-between text-[10px]">
                  <span className="text-white/60">{step.name}</span>
                  <span className={step.status === 'completed' ? 'text-emerald-500' : step.status === 'running' ? 'text-orange-500' : 'text-white/20'}>
                    {step.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Execution Log */}
        <div className="col-span-8 space-y-4">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Execution Sequence</h3>
          
          <div className="space-y-3">
            {steps.map((step, idx) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 rounded-lg border transition-all ${
                  step.status === 'running' ? 'bg-orange-500/5 border-orange-500/30' :
                  step.status === 'completed' ? 'bg-emerald-500/5 border-emerald-500/20' :
                  'bg-white/2 border-white/5'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    step.status === 'running' ? 'bg-orange-500/20 text-orange-500' :
                    step.status === 'completed' ? 'bg-emerald-500/20 text-emerald-500' :
                    'bg-white/5 text-white/20'
                  }`}>
                    {step.status === 'running' ? <Loader2 size={18} className="animate-spin" /> : <step.icon size={18} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${
                        step.status === 'running' ? 'text-orange-500' :
                        step.status === 'completed' ? 'text-emerald-500' :
                        'text-white/20'
                      }`}>
                        {step.name}
                      </span>
                      {step.status === 'completed' && <CheckCircle2 size={14} className="text-emerald-500" />}
                    </div>
                    <p className={`text-xs ${step.status === 'pending' ? 'text-white/20' : 'text-white/80'}`}>
                      {step.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="bg-white/5 px-6 py-3 border-t border-white/10 flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white/60">LATENCY: 142ms</span>
          </div>
          <div className="flex items-center gap-2">
            <Database size={12} className="text-white/40" />
            <span className="text-white/60">CACHE: HIT (90-DAY)</span>
          </div>
        </div>
        <div className="text-white/40 italic">System operating within P95 SLA targets...</div>
      </div>
    </div>
  );
};
