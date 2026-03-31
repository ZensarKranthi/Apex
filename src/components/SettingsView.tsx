import React, { useState } from 'react';
import { Settings as SettingsIcon, ShieldCheck, Database, Cpu, Lock, Bell, Users, Globe, Activity, Zap, ShieldAlert, Key, Languages } from 'lucide-react';

export const SettingsView = () => {
  const [activeTab, setActiveTab] = useState('agentic');

  const settingsData: Record<string, any[]> = {
    agentic: [
      { id: 'S-001', type: 'Orchestration', label: 'Master Orchestrator Failover', description: 'Enable automatic switch from GPT-4o to Claude 3.5 Sonnet on high latency or provider outage.', status: 'Enabled' },
      { id: 'S-002', type: 'Performance', label: 'LangGraph Worker Pods', description: 'Current scaling: 2–50 pods based on queue depth. Auto-scaling is managed by Kubernetes HPA.', value: '12 Active' },
      { id: 'S-003', type: 'Memory', label: 'Episodic Memory TTL', description: 'Per-client interaction history stored in Pinecone. Updated post-meeting.', value: 'Permanent' },
      { id: 'S-004', type: 'Memory', label: 'Semantic Memory Window', description: 'Market knowledge base rolling window for time-weighted retrieval.', value: '90 Days' },
    ],
    integrations: [
      { id: 'I-001', type: 'Core Banking', label: 'Temenos T24 API Hub', description: 'Retrieves client profile, IPS, and risk ratings via OAuth 2.0 + mTLS.', status: 'Connected' },
      { id: 'I-002', type: 'Portfolio', label: 'SimCorp Dimension REST', description: 'Read-only access to holdings, performance, and attribution data.', status: 'Connected' },
      { id: 'I-003', type: 'CRM', label: 'Salesforce FSC', description: 'Syncs meeting history, notes, and logged preferences.', status: 'Connected' },
      { id: 'I-004', type: 'Market Data', label: 'Bloomberg B-PIPE', description: 'Real-time streaming for equities, FX, and fixed income.', status: 'Active' },
      { id: 'I-005', type: 'Analytics', label: 'FactSet Data API', description: 'Ingests earnings calendars and analyst consensus data.', status: 'Connected' },
    ],
    compliance: [
      { id: 'C-001', type: 'Quality', label: 'Confidence Threshold', description: 'Minimum score (0-100) before routing to human review queue. Current target: ≥ 82.', value: '75' },
      { id: 'C-002', type: 'Regulatory', label: 'MiFID II Suitability Check', description: 'Enforce mandatory suitability flags in every generated brief.', status: 'Mandatory' },
      { id: 'C-003', type: 'Audit', label: 'FCA Audit Log Retention', description: 'Stores all agent actions, inputs, and outputs for regulatory oversight.', value: '7 Years' },
      { id: 'C-004', type: 'Ethics', label: 'Bias Audit Frequency', description: 'Quarterly automated audits across client age, gender, and nationality.', value: 'Quarterly' },
    ],
    security: [
      { id: 'SEC-001', type: 'Encryption', label: 'TLS 1.3 Enforcement', description: 'All API communications must use TLS 1.3 minimum. TLS 1.2 is deprecated.', status: 'Active' },
      { id: 'SEC-002', type: 'Auth', label: 'Azure AD SSO + MFA', description: 'FIDO2 preferred for all internal Relationship Manager access.', status: 'Enforced' },
      { id: 'SEC-003', type: 'Secrets', label: 'HashiCorp Vault Rotation', description: 'Dynamic secrets with automatic rotation every 90 days.', status: 'Active' },
      { id: 'SEC-004', type: 'Protection', label: 'Prompt Injection Guardrails', description: 'NeMo Guardrails integrated at input sanitisation layer.', status: 'Active' },
    ],
    localization: [
      { id: 'L-001', type: 'Region', label: 'Primary Cloud Region', description: 'Main deployment region for data residency compliance.', value: 'UK South' },
      { id: 'L-002', type: 'Region', label: 'Secondary (DR) Region', description: 'Disaster recovery site with < 15 min RTO.', value: 'UK West' },
      { id: 'L-003', type: 'Currency', label: 'Default Reporting Currency', description: 'Base currency for portfolio performance summaries.', value: 'GBP (£)' },
      { id: 'L-004', type: 'Language', label: 'System Language', description: 'Primary language for AI-generated narratives and talking points.', value: 'English (UK)' },
    ]
  };

  const tabs = [
    { id: 'agentic', label: 'Agentic Framework', icon: Cpu },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'compliance', label: 'Compliance & Risk', icon: ShieldCheck },
    { id: 'security', label: 'Security & Auth', icon: Lock },
    { id: 'localization', label: 'Localization', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Settings</h2>
          <p className="text-gray-500">Configure the APEX Agentic AI platform and enterprise integrations.</p>
        </div>
        <button className="px-4 py-2 bg-[#111827] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-white border border-orange-500/20 text-orange-600 shadow-sm' 
                  : 'text-gray-500 hover:bg-white hover:text-gray-700'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="col-span-9 space-y-4">
          {settingsData[activeTab].map((setting) => (
            <div key={setting.id} className="bg-white p-6 rounded-xl border border-black/5 flex items-center justify-between group hover:border-black/10 transition-all">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold text-[#111827]">{setting.label}</h4>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded text-[10px] font-bold uppercase tracking-widest">{setting.type}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{setting.description}</p>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                {setting.status ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-sm font-bold text-emerald-600">{setting.status}</span>
                  </div>
                ) : (
                  <div className="px-4 py-2 bg-gray-50 border border-black/5 rounded-lg text-sm font-mono font-bold text-[#111827]">
                    {setting.value}
                  </div>
                )}
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <SettingsIcon size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
