import React, { useState } from 'react';
import { Prize, Winner } from '../types';
import { X, Trash2, Search, Download } from 'lucide-react';
import { exportToCSV } from '../utils';

interface ResultsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  winners: Winner[];
  prizes: Prize[];
  setWinners: (w: Winner[]) => void;
}

export const ResultsListModal: React.FC<ResultsListModalProps> = ({
  isOpen, onClose, winners, prizes, setWinners
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredWinners = winners.filter(w => 
    w.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.participant.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Bạn chắc chắn muốn hủy kết quả của "${name}"? Giải thưởng sẽ được trả lại kho.`)) {
      setWinners(winners.filter(w => w.id !== id));
    }
  };

  const handleExport = () => {
     const data = winners.map(w => {
         const p = prizes.find(pz => pz.id === w.prizeId);
         return {
             'Giải thưởng': p?.name,
             'Mã NV': w.participant.code,
             'Họ tên': w.participant.name,
             'Bộ phận': w.participant.department,
             'Thời gian': new Date(w.timestamp).toLocaleTimeString()
         }
     });
     exportToCSV(data, 'Ket_Qua_Quay_So.csv');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-yep-red to-red-900 text-white">
          <div className="flex items-center gap-3">
             <button 
                className="bg-white/20 p-2 rounded hover:bg-white/30 text-yep-gold hover:text-white transition"
                onClick={handleExport} 
                title="Xuất Excel"
             >
                <Download size={20} />
             </button>
             <div>
                <h2 className="text-xl font-bold font-display uppercase">Danh sách trúng giải</h2>
                <p className="text-xs text-white/60">Tổng cộng: {winners.length} giải đã trao</p>
             </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition"><X /></button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b bg-gray-50 flex gap-4">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm tên hoặc mã nhân viên..." 
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yep-red/50 text-gray-900 placeholder:text-gray-400 bg-white"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
           </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-0">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10 uppercase text-xs font-bold">
              <tr>
                <th className="p-4">STT</th>
                <th className="p-4">Giải thưởng</th>
                <th className="p-4">Mã NV</th>
                <th className="p-4">Họ và Tên</th>
                <th className="p-4">Bộ phận</th>
                <th className="p-4 text-center">Xóa</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredWinners.length === 0 ? (
                 <tr>
                    <td colSpan={6} className="p-12 text-center text-gray-400 italic">Chưa có dữ liệu</td>
                 </tr>
              ) : (
                filteredWinners.slice().reverse().map((w, index) => {
                  const prize = prizes.find(p => p.id === w.prizeId);
                  return (
                    <tr key={w.id} className="hover:bg-blue-50 group transition-colors">
                      <td className="p-4 text-gray-500 font-mono">{filteredWinners.length - index}</td>
                      <td className="p-4">
                         <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md">
                           {prize?.name}
                         </span>
                      </td>
                      <td className="p-4 font-mono text-gray-600 font-bold">{w.participant.code}</td>
                      <td className="p-4 font-bold text-gray-800 text-base">{w.participant.name}</td>
                      <td className="p-4 text-gray-500">{w.participant.department}</td>
                      <td className="p-4 text-center">
                         <button 
                           onClick={() => handleDelete(w.id, w.participant.name)}
                           className="text-red-500 bg-red-50 p-2 rounded opacity-0 group-hover:opacity-100 transition-all hover:bg-red-100 hover:scale-110 shadow-sm"
                           title="Xóa kết quả này"
                         >
                           <Trash2 size={16}/>
                         </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};