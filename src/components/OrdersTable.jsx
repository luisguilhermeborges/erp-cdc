import React from 'react';
import { Trash2, Search } from 'lucide-react';

const OrdersTable = ({ items, stockName, onDelete, searchTerm, setSearchTerm }) => (
  <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
    <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="font-bold text-slate-700 uppercase text-xs tracking-widest">
        Inventário Atual: <span className="text-blue-600">{stockName}</span>
      </div>
      
      {/* Barra de Busca Interna */}
      <div className="relative w-full md:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
        <input 
          type="text"
          placeholder="Buscar produto..."
          className="w-full bg-slate-50 pl-10 pr-4 py-2 rounded-xl text-xs border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-[10px] uppercase text-slate-400 font-black">
          <tr>
            <th className="px-8 py-4">Produto</th>
            <th className="px-8 py-4">Qtd (kg)</th>
            <th className="px-8 py-4">Status</th>
            <th className="px-8 py-4 text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {items.length > 0 ? items.map(i => (
            <tr key={i.id} className="text-xs hover:bg-slate-50/50 transition-colors">
              <td className="px-8 py-4 font-bold text-slate-700">{i.name}</td>
              <td className="px-8 py-4 text-slate-500">{i.qty}kg</td>
              <td className={`px-8 py-4 font-black uppercase text-[9px] ${
                i.status === 'Baixo Estoque' ? 'text-orange-500' : 'text-green-500'
              }`}>
                {i.status}
              </td>
              <td className="px-8 py-4 text-center">
                <button 
                  onClick={() => onDelete(i.id)}
                  className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" className="px-8 py-10 text-center text-slate-400 italic">
                {searchTerm ? `Nenhum produto encontrado para "${searchTerm}"` : "Sem itens registrados nesta unidade."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default OrdersTable;