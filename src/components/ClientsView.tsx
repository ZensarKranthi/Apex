import React from 'react';
import { Search, UserPlus, MoreVertical, ExternalLink, Mail, Phone } from 'lucide-react';

export const ClientsView = () => {
  const clients = [
    { id: 'C-12345', name: 'Alistair Montgomery-Smythe', tier: 'UHNW', aum: '£42.5M', status: 'Active', lastMeeting: '2026-02-10' },
    { id: 'C-12346', name: 'Elena Rodriguez', tier: 'HNW', aum: '£8.2M', status: 'Active', lastMeeting: '2026-03-15' },
    { id: 'C-12347', name: 'Dr. Marcus Chen', tier: 'UHNW', aum: '£15.7M', status: 'Review Required', lastMeeting: '2026-01-20' },
    { id: 'C-12348', name: 'Sarah Jenkins', tier: 'HNW', aum: '£4.1M', status: 'Active', lastMeeting: '2026-03-01' },
    { id: 'C-12349', name: 'The Thompson Family Trust', tier: 'UHNW', aum: '£110.0M', status: 'Active', lastMeeting: '2026-02-28' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Client Directory</h2>
          <p className="text-gray-500">Manage your HNW/UHNW client relationships and portfolio access.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#111827] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
          <UserPlus size={16} />
          Onboard Client
        </button>
      </div>

      <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
        <div className="p-4 border-b border-black/5 bg-gray-50 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter by name, tier, or status..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-black/10 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-black/5">
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Client Name</th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Tier</th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">AUM</th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Last Meeting</th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b border-black/5 hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-bold text-[#111827]">{client.name}</div>
                  <div className="text-[10px] text-gray-400 font-mono">{client.id}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    client.tier === 'UHNW' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {client.tier}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">{client.aum}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      client.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`} />
                    <span className="text-xs text-gray-600">{client.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">{client.lastMeeting}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors">
                      <Mail size={16} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors">
                      <ExternalLink size={16} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
