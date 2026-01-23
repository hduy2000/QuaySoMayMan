import React, { useState } from 'react';
import { Participant, Prize, Winner } from '../types';
import { X, Trash2, Upload, RotateCcw, Save, Keyboard, FileJson } from 'lucide-react';
import { DEFAULT_PARTICIPANTS, DEFAULT_PRIZES } from '../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  participants: Participant[];
  setParticipants: (p: Participant[]) => void;
  prizes: Prize[];
  setPrizes: (p: Prize[]) => void;
  winners: Winner[];
  setWinners: (w: Winner[]) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen, onClose, participants, setParticipants, prizes, setPrizes, winners, setWinners
}) => {
  const [activeTab, setActiveTab] = useState<'participants' | 'prizes' | 'winners'>('participants');
  const [importText, setImportText] = useState('');

  if (!isOpen) return null;

  const handleImport = () => {
    try {
      // Try parsing as JSON first
      if (importText.trim().startsWith('[')) {
        const jsonData = JSON.parse(importText);
        // Map any field names if they differ, or assume they match interface
        const newParticipants = jsonData.map((item: any, idx: number) => ({
            id: item.id || `json-${Date.now()}-${idx}`,
            code: item.code || item['Mã NV'] || 'N/A',
            name: item.name || item['Họ và tên'] || 'Unknown',
            department: item.department || item['Khoa Phòng'] || 'General',
            yearsWorked: Number(item.yearsWorked || item['Thâm niên làm tròn'] || 0)
        }));
        setParticipants([...participants, ...newParticipants]);
        setImportText('');
        alert(`Đã thêm ${newParticipants.length} người từ JSON.`);
        return;
      }

      // Fallback to CSV format
      const rows = importText.trim().split('\n');
      const newParticipants: Participant[] = rows.map((row, index) => {
        // Expected format: Code, Name, Department, Years
        const parts = row.split(/,|;/).map(s => s.trim());
        if (parts.length < 3) return null;
        return {
          id: `imported-${Date.now()}-${index}`,
          code: parts[0] || 'N/A',
          name: parts[1] || 'Unknown',
          department: parts[2] || 'General',
          yearsWorked: parseInt(parts[3] || '0', 10)
        };
      }).filter(Boolean) as Participant[];

      setParticipants([...participants, ...newParticipants]);
      setImportText('');
      alert(`Đã thêm ${newParticipants.length} người vào danh sách.`);
    } catch (e) {
      alert('Lỗi định dạng. Vui lòng kiểm tra lại. Hỗ trợ JSON mảng hoặc CSV.');
    }
  };

  const handleResetAll = () => {
    if (confirm('Bạn có chắc muốn xóa toàn bộ dữ liệu và về mặc định?')) {
      setParticipants(DEFAULT_PARTICIPANTS);
      setPrizes(DEFAULT_PRIZES);
      setWinners([]);
    }
  };

  const clearWinners = () => {
     if (confirm('Bạn có chắc muốn xóa lịch sử trúng giải?')) {
      setWinners([]);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4">
      <div className="bg-white text-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border-t-8 border-yep-red">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
          <h2 className="text-xl font-bold font-display uppercase text-yep-red">Cài đặt hệ thống</h2>
          <button onClick={onClose} className="hover:bg-gray-200 p-2 rounded-full transition text-gray-500"><X /></button>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-white">
          <button 
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider ${activeTab === 'participants' ? 'text-yep-red border-b-2 border-yep-red bg-red-50' : 'text-gray-400 hover:text-gray-600'}`}
            onClick={() => setActiveTab('participants')}
          >
            1. Danh sách nhân viên
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider ${activeTab === 'prizes' ? 'text-yep-red border-b-2 border-yep-red bg-red-50' : 'text-gray-400 hover:text-gray-600'}`}
            onClick={() => setActiveTab('prizes')}
          >
             2. Cấu hình Giải thưởng
          </button>
          <button 
             className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider ${activeTab === 'winners' ? 'text-yep-red border-b-2 border-yep-red bg-red-50' : 'text-gray-400 hover:text-gray-600'}`}
             onClick={() => setActiveTab('winners')}
          >
            3. Kết quả
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          
          {activeTab === 'participants' && (
            <div className="space-y-6">
              
              <div className="bg-blue-50 border border-blue-200 p-4 rounded text-sm text-blue-800">
                 <div className="font-bold mb-1 flex items-center gap-2"><FileJson size={16}/> Cách nhập dữ liệu JSON:</div>
                 Bạn có thể copy mảng JSON từ Excel (sau khi convert) và dán vào đây. Cấu trúc hỗ trợ:
                 <pre className="bg-white p-2 rounded mt-2 text-xs border border-blue-100">
{`[
  { "Mã NV": "21042", "Họ và tên": "Nguyễn Văn A", "Khoa Phòng": "Ban GĐ", "Thâm niên làm tròn": 5 },
  ...
]`}
                 </pre>
                 <div className="mt-2 text-xs text-gray-500">
                    Hoặc nhập CSV đơn giản: <code>Mã, Tên, Khoa, Số năm</code>
                 </div>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <textarea 
                  className="w-full border p-3 rounded h-32 text-xs font-mono focus:ring-2 focus:ring-yep-red focus:outline-none"
                  placeholder='Dán dữ liệu JSON hoặc CSV vào đây...'
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                ></textarea>
                <div className="flex justify-end mt-2">
                    <button 
                      onClick={handleImport}
                      className="bg-yep-red text-white px-4 py-2 rounded hover:bg-red-700 text-sm font-bold flex items-center gap-2 shadow"
                    >
                      <Upload size={16}/> Nhập dữ liệu
                    </button>
                </div>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h3 className="font-bold text-gray-700">Danh sách hiện tại ({participants.length})</h3>
                  <button 
                    onClick={() => setParticipants([])}
                    className="text-red-500 text-xs hover:underline uppercase font-bold"
                  >
                    Xóa tất cả
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 sticky top-0">
                      <tr>
                        <th className="p-2">Mã NV</th>
                        <th className="p-2">Họ và Tên</th>
                        <th className="p-2">Khoa Phòng</th>
                        <th className="p-2 text-center">Thâm niên (năm)</th>
                        <th className="p-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {participants.map(p => (
                        <tr key={p.id} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-mono text-gray-600">{p.code}</td>
                          <td className="p-2 font-bold text-gray-800">{p.name}</td>
                          <td className="p-2 text-gray-500">{p.department}</td>
                          <td className="p-2 text-center font-bold text-yep-red">{p.yearsWorked}</td>
                          <td className="p-2 text-right">
                             <button onClick={() => setParticipants(participants.filter(x => x.id !== p.id))} className="text-gray-400 hover:text-red-600"><Trash2 size={14}/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prizes' && (
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded border border-yellow-200 text-sm text-yellow-800 flex items-start gap-3">
                 <Keyboard size={24} className="mt-1"/>
                 <div>
                    <strong>Điều khiển bí mật:</strong>
                    <ul className="list-disc ml-4 mt-1 space-y-1">
                        <li>Trên màn hình chính, dùng phím mũi tên <strong>Trái ⬅</strong> hoặc <strong>Phải ➡</strong> để chuyển đổi giải thưởng mà người chơi không biết.</li>
                        <li>Dùng phím <strong>SPACE</strong> để quay thưởng (thay vì click chuột).</li>
                    </ul>
                 </div>
              </div>
              {prizes.map((prize, idx) => (
                <div key={prize.id} className="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-4 items-start md:items-center border-l-4 border-gray-300 hover:border-yep-red transition">
                   <div className="flex-1">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tên giải</label>
                      <input 
                        type="text" 
                        value={prize.name} 
                        onChange={(e) => {
                          const newPrizes = [...prizes];
                          newPrizes[idx].name = e.target.value;
                          setPrizes(newPrizes);
                        }}
                        className="font-bold text-lg text-gray-800 w-full border-b border-transparent focus:border-yep-red focus:outline-none" 
                      />
                   </div>
                   <div className="w-24">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Số lượng</label>
                      <input 
                        type="number" 
                        value={prize.quantity}
                        onChange={(e) => {
                          const newPrizes = [...prizes];
                          newPrizes[idx].quantity = parseInt(e.target.value);
                          setPrizes(newPrizes);
                        }}
                        className="w-full border p-1 rounded font-mono" 
                      />
                   </div>
                   <div className="w-32">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Thâm niên (Min)</label>
                      <input 
                        type="number" 
                        value={prize.minYears}
                        onChange={(e) => {
                          const newPrizes = [...prizes];
                          newPrizes[idx].minYears = parseInt(e.target.value);
                          setPrizes(newPrizes);
                        }}
                        className="w-full border p-1 rounded bg-yellow-50 font-bold text-yellow-700" 
                      />
                   </div>
                </div>
              ))}
            </div>
          )}

           {activeTab === 'winners' && (
            <div className="space-y-6">
               <div className="flex justify-end">
                  <button onClick={clearWinners} className="flex items-center gap-2 text-red-600 border border-red-200 bg-red-50 px-3 py-1 rounded hover:bg-red-100 text-sm font-bold">
                    <RotateCcw size={16} /> Reset kết quả quay
                  </button>
               </div>
               <div className="bg-white rounded shadow overflow-hidden border">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">Giải thưởng</th>
                      <th className="p-3 text-left">Người trúng</th>
                      <th className="p-3 text-left">Chi tiết</th>
                      <th className="p-3 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {winners.length === 0 ? (
                      <tr><td colSpan={4} className="p-8 text-center text-gray-400 italic">Chưa có dữ liệu trúng thưởng</td></tr>
                    ) : (
                      winners.map(w => {
                        const prize = prizes.find(p => p.id === w.prizeId);
                        return (
                          <tr key={w.id} className="border-b group">
                            <td className="p-3 font-bold text-yep-red">{prize?.name || 'Unknown'}</td>
                            <td className="p-3">
                                <div className="font-bold">{w.participant.name}</div>
                                <div className="text-xs text-gray-400">{w.participant.code}</div>
                            </td>
                            <td className="p-3 text-xs text-gray-500">
                                {w.participant.department} <br/>
                                (TN: {w.participant.yearsWorked} năm)
                            </td>
                            <td className="p-3 text-right">
                              <button 
                                onClick={() => setWinners(winners.filter(x => x.id !== w.id))}
                                className="text-gray-300 hover:text-red-600 p-2"
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
           )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
            <button 
              onClick={handleResetAll} 
              className="text-xs text-gray-400 hover:text-red-600 underline"
            >
              Reset dữ liệu mẫu
            </button>
            <button 
              onClick={onClose} 
              className="bg-gray-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-900 transition shadow-lg flex items-center gap-2"
            >
              <Save size={18} /> ĐÓNG CÀI ĐẶT
            </button>
        </div>
      </div>
    </div>
  );
};