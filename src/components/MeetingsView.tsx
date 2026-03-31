import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, CheckCircle2, AlertCircle, MoreHorizontal } from 'lucide-react';

export const MeetingsView = () => {
  const meetings = [
    { id: 'M-101', client: 'Alistair Montgomery-Smythe', time: '10:00 AM', date: 'Today', type: 'Portfolio Review', location: 'London Office, Room 4B', status: 'Brief Ready' },
    { id: 'M-102', client: 'Elena Rodriguez', time: '02:30 PM', date: 'Today', type: 'Estate Planning', location: 'Virtual (Teams)', status: 'Processing' },
    { id: 'M-103', client: 'Dr. Marcus Chen', time: '04:00 PM', date: 'Today', type: 'New Investment Strategy', location: 'Client Residence', status: 'Pending Data' },
    { id: 'M-104', client: 'Sarah Jenkins', time: '09:00 AM', date: 'Tomorrow', type: 'Annual Review', location: 'London Office, Room 2A', status: 'Scheduled' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Meeting Schedule</h2>
          <p className="text-gray-500">Track upcoming client interactions and APEX brief readiness.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-black/10 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Calendar View
          </button>
          <button className="px-4 py-2 bg-[#111827] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
            Schedule Meeting
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="bg-white p-6 rounded-xl border border-black/5 flex items-center justify-between group hover:border-orange-500/30 hover:shadow-md transition-all">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex flex-col items-center justify-center border border-black/5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{meeting.date === 'Today' ? 'MAR' : 'MAR'}</span>
                <span className="text-lg font-bold text-[#111827] leading-none">{meeting.date === 'Today' ? '30' : '31'}</span>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-lg text-[#111827] group-hover:text-orange-600 transition-colors">{meeting.client}</h4>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-bold uppercase">{meeting.type}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {meeting.time}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> {meeting.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className={`flex items-center justify-end gap-1.5 text-xs font-bold uppercase tracking-wider mb-1 ${
                  meeting.status === 'Brief Ready' ? 'text-emerald-600' : 
                  meeting.status === 'Processing' ? 'text-amber-600' : 'text-gray-400'
                }`}>
                  {meeting.status === 'Brief Ready' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                  {meeting.status}
                </div>
                <p className="text-[10px] text-gray-400 font-mono uppercase">Ref: {meeting.id}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
