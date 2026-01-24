import React, { useState, useEffect } from 'react';
import { Prize, Winner } from '../types';
import { X, Trash2, Search, Download } from 'lucide-react';
import { exportToCSV } from '../utils';
import Swal from 'sweetalert2';

interface ResultsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  winners: Winner[];
  prizes: Prize[];
  setWinners: (w: Winner[]) => void;
  initialSelectedPrizeId: string;
}

export const ResultsListModal: React.FC<ResultsListModalProps> = ({
  isOpen, onClose, winners, prizes, setWinners, initialSelectedPrizeId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrizeId, setSelectedPrizeId] = useState<string>('all');

  useEffect(() => {
    if (isOpen) {
      setSelectedPrizeId(initialSelectedPrizeId || 'all');
    }
  }, [isOpen, initialSelectedPrizeId]);

  if (!isOpen) return null;

  // 1. Filter by search term
  const searchedWinners = winners.filter(w => 
    w.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.participant.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Sort by prize order
  const prizeOrder = ['p_dacbiet', 'p_nhat', 'p_nhi', 'p_mayman'];
  const sortedWinners = searchedWinners.sort((a, b) => {
    const prizeAIndex = prizeOrder.indexOf(a.prizeId);
    const prizeBIndex = prizeOrder.indexOf(b.prizeId);
    return prizeAIndex - prizeBIndex;
  });
  
  // 3. Filter by selected prize tab
  const displayedWinners = selectedPrizeId === 'all'
    ? sortedWinners
    : sortedWinners.filter(w => w.prizeId === selectedPrizeId);


  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: `Hủy kết quả của "${name}" sẽ trả lại giải thưởng vào kho. Hành động này không thể hoàn tác!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý, Hủy kết quả!',
      cancelButtonText: 'Không',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      customClass: {
        popup: 'rounded-xl',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setWinners(winners.filter(w => w.id !== id));
        Swal.fire({
          title: 'Đã xóa!',
          text: `Kết quả của ${name} đã được hủy.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          customClass: { popup: 'rounded-xl' }
        });
      }
    });
  };

  const handleExport = () => {
     const data = displayedWinners.map(w => {
         return {
             'Mã NV': w.participant.code,
             'Họ tên': w.participant.name,
             'Bộ phận': w.participant.department,
             'Thời gian': new Date(w.timestamp).toLocaleTimeString()
         }
     });
     const prizeName = prizes.find(p => p.id === selectedPrizeId)?.name || 'Tat_Ca';
     const fileName = `Ket_Qua_${prizeName.replace(/\s+/g, '_')}.csv`;
     exportToCSV(data, fileName);
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

        {/* Toolbar & Tabs */}
        <div className="p-4 border-b bg-gray-50">
           <div className="relative flex-1 mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm tên hoặc mã nhân viên..." 
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yep-red/50 text-gray-900 placeholder:text-gray-400 bg-white"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex items-center gap-2 flex-wrap">
              <button 
                onClick={() => setSelectedPrizeId('all')}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition ${selectedPrizeId === 'all' ? 'bg-yep-red text-white shadow' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              >
                Tất cả ({winners.length})
              </button>
              {prizes.map(p => {
                const count = winners.filter(w => w.prizeId === p.id).length;
                if (count === 0) return null;
                return (
                  <button 
                    key={p.id}
                    onClick={() => setSelectedPrizeId(p.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold transition ${selectedPrizeId === p.id ? 'bg-yep-red text-white shadow' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                  >
                    {p.name} ({count})
                  </button>
                )
              })}
           </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-0">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-900 sticky top-0 z-10 uppercase text-xs font-black">
              <tr>
                <th className="p-4">STT</th>
                <th className="p-4">Mã NV</th>
                <th className="p-4">Họ và Tên</th>
                <th className="p-4">Bộ phận</th>
                <th className="p-4 text-center">Xóa</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {displayedWinners.length === 0 ? (
                 <tr>
                    <td colSpan={5} className="p-12 text-center text-gray-400 italic">Chưa có dữ liệu</td>
                 </tr>
              ) : (
                displayedWinners.map((w, index) => {
                  const prize = prizes.find(p => p.id === w.prizeId);

                  const getPrizeRowClass = (prizeId: string) => {
                    switch (prizeId) {
                      case 'p_dacbiet': return 'bg-yep-gold/20 hover:bg-yep-gold/30';
                      case 'p_nhat': return 'bg-blue-100/50 hover:bg-blue-200/50';
                      case 'p_nhi': return 'bg-green-100/50 hover:bg-green-200/50';
                      default: return 'hover:bg-gray-50';
                    }
                  };

                  const getPrizeBadgeClass = (prizeId: string) => {
                    switch (prizeId) {
                      case 'p_dacbiet': return 'bg-gradient-to-r from-red-600 to-red-800 text-white';
                      case 'p_nhat': return 'bg-gradient-to-r from-blue-600 to-blue-800 text-white';
                      case 'p_nhi': return 'bg-gradient-to-r from-green-600 to-green-800 text-white';
                      default: return 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white';
                    }
                  };
                  
                  return (
                    <tr 
                      key={w.id} 
                      className={`group transition-colors ${getPrizeRowClass(w.prizeId)}`}
                    >
                      <td className="p-4 text-gray-500 font-mono">{index + 1}</td>
                      <td className="p-4 font-mono text-gray-600 font-bold">{w.participant.code}</td>
                      <td className="p-4 font-bold text-gray-800 text-base">{w.participant.name}</td>
                      <td className="p-4 text-gray-500">{w.participant.department}</td>
                      <td className="p-4 text-center">
                         <button 
                           onClick={() => handleDelete(w.id, w.participant.name)}
                           className="text-red-500 bg-red-50 p-2 rounded transition-all hover:bg-red-100 hover:scale-110 shadow-sm"
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