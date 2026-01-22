import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const StockEntryForm = ({ activeStock, onAdd }) => {
  const [produto, setProduto] = useState('');
  const [qtd, setQtd] = useState('');

  const handle = (e) => {
    e.preventDefault();
    if(!produto || !qtd || qtd <= 0) return;
    
    onAdd({ 
      name: produto, 
      qty: parseFloat(qtd).toFixed(2), 
      unit: activeStock, 
      price: '0.00' 
    });
    
    setProduto(''); 
    setQtd('');
  };

  return (
    <form onSubmit={handle} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Produto</label>
        <input 
          type="text" 
          placeholder="Ex: Picanha" 
          className="bg-slate-50 p-3 rounded-xl text-xs border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
          value={produto} 
          onChange={e => setProduto(e.target.value)} 
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Quantidade (kg)</label>
        <input 
          type="number" 
          step="0.01"
          placeholder="0.00" 
          className="bg-slate-50 p-3 rounded-xl text-xs border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
          value={qtd} 
          onChange={e => setQtd(e.target.value)} 
          required
        />
      </div>
      <div className="flex items-end">
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white font-bold h-[42px] rounded-xl text-xs hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-all"
        >
          <PlusCircle size={16}/> Registar Entrada
        </button>
      </div>
    </form>
  );
};

export default StockEntryForm;