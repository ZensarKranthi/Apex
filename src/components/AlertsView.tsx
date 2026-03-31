import React from 'react';
import { ShieldAlert, TrendingUp, UserCheck, Info, ChevronRight, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AlertsView = () => {
  const alerts = [
    { id: 'A-001', type: 'Suitability', severity: 'High', client: 'Alistair Montgomery-Smythe', message: 'Concentrated position in LVMH (>15%) exceeds IPS risk threshold. Suitability review required before next meeting.', status: 'Unresolved' },
    { id: 'A-002', type: 'Market', severity: 'Medium', client: 'Elena Rodriguez', message: 'Significant volatility in European Luxury sector affecting 24% of portfolio holdings. Market intelligence brief updated.', status: 'Acknowledged' },
    { id: 'A-003', type: 'Compliance', severity: 'High', client: 'Dr. Marcus Chen', message: 'MiFID II cost disclosure document missing for proposed rebalancing. Action required to maintain regulatory alignment.', status: 'Unresolved' },
    { id: 'A-004', type: 'Client', severity: 'Low', client: 'Sarah Jenkins', message: 'Upcoming life event: 50th Anniversary in 14 days. Personalized conversation starter generated.', status: 'Resolved' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Alerts & Notifications</h2>
          <p className="text-gray-500">Monitor critical compliance flags, suitability reminders, and market developments.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-black/10 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Mark All Read
          </button>
          <button className="px-4 py-2 bg-[#111827] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
            Export Audit Log
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={`bg-white p-6 rounded-xl border flex items-start gap-6 transition-all hover:shadow-md ${
            alert.severity === 'High' ? 'border-rose-500/20 bg-rose-50/10' : 'border-black/5'
          }`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              alert.type === 'Suitability' ? 'bg-rose-100 text-rose-600' :
              alert.type === 'Market' ? 'bg-amber-100 text-amber-600' :
              alert.type === 'Compliance' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
            }`}>
              {alert.type === 'Suitability' ? <ShieldAlert size={20} /> :
               alert.type === 'Market' ? <TrendingUp size={20} /> :
               alert.type === 'Compliance' ? <AlertTriangle size={20} /> : <UserCheck size={20} />}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{alert.type} Alert</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    alert.severity === 'High' ? 'bg-rose-500 text-white' :
                    alert.severity === 'Medium' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'
                  }`}>
                    {alert.severity} Priority
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono uppercase">ID: {alert.id}</span>
              </div>
              <h4 className="font-bold text-[#111827] mb-1">{alert.client}</h4>
              <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">{alert.message}</p>
              
              <div className="mt-4 flex items-center gap-4">
                <button className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 group">
                  Take Action <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                <button className="text-xs font-bold text-gray-400 hover:text-gray-600">Dismiss</button>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className={`flex items-center justify-end gap-1.5 text-xs font-bold uppercase tracking-wider ${
                alert.status === 'Unresolved' ? 'text-rose-600' :
                alert.status === 'Acknowledged' ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                {alert.status === 'Resolved' && <CheckCircle2 size={14} />}
                {alert.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
