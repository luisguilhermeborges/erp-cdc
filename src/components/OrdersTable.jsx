import React from 'react';

const OrdersTable = ({ items, stockName }) => (
  <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
    <div className="p-6 border-b border-slate-50 font-bold text-slate-700 uppercase text-xs tracking-widest">
      Inventário Atual: <span className="text-blue-600">{stockName}</span>
    </div>
    <table className="w-full text-left">
      <thead className="bg-slate-50 text-[10px] uppercase text-slate-400 font-black">
        <tr>
          <th className="px-8 py-4">Produto</th>
          <th className="px-8 py-4">Qtd (kg)</th>
          <th className="px-8 py-4">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {items.length > 0 ? items.map(i => (
          <tr key={i.id} className="text-xs hover:bg-slate-50/50 transition-colors">
            <td className="px-8 py-4 font-bold text-slate-700">{i.name}</td>
            <td className="px-8 py-4 text-slate-500">{i.qty}kg</td>
            <td className="px-8 py-4 font-black uppercase text-green-500 text-[9px]">{i.status}</td>
          </tr>
        )) : (
          <tr><td colSpan="3" className="px-8 py-10 text-center text-slate-400 italic">Sem itens registados nesta unidade.</td></tr>
        )}
      </tbody>
    </table>
  </div>
);

export default OrdersTable;