import React, { useState } from 'react';
import { Participant } from '../types';
import { X, Search, Users } from 'lucide-react';

interface ParticipantsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  participants: Participant[];
}

export const ParticipantsListModal: React.FC<ParticipantsListModalProps> = ({
  isOpen, onClose, participants
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = participants.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-gray-800 to-black text-white">
          <div className="flex items-center gap-3">
             <Users size={24} className="text-yep-gold"/>
             <div>
                <h2 className="text-xl font-bold font-display uppercase">Người tham dự</h2>
                <p className="text-xs text-white/60">Tổng số: {participants.length} nhân viên</p>
             </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition"><X /></button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b bg-gray-50">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm nhân viên, mã số, khoa phòng..." 
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
           </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-0 bg-gray-50">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
              {filtered.map(p => (
                 <div key={p.id} className="bg-white p-3 rounded border hover:shadow-md transition flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 text-xs font-mono">
                       {p.code}
                    </div>
                    <div className="overflow-hidden">
                       <p className="font-bold text-gray-800 truncate">{p.name}</p>
                       <p className="text-xs text-gray-500 truncate">{p.department}</p>
                    </div>
                 </div>
              ))}
              {filtered.length === 0 && (
                 <div className="col-span-full text-center p-8 text-gray-400">Không tìm thấy nhân viên nào</div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};