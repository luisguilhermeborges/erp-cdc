import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import WelcomeBanner from './components/WelcomeBanner';
import StockSelector from './components/StockSelector';
import OrdersTable from './components/OrdersTable';
import StatusCard from './components/StatusCard';
import StockEntryForm from './components/StockEntryForm';

function App() {
  const [activeStock, setActiveStock] = useState('matriz');
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Picanha', qty: 50, unit: 'matriz', status: 'Em Estoque', price: '89.90' },
    { id: 2, name: 'Contra Filé', qty: 30, unit: 'alphaville', status: 'Em Estoque', price: '65.00' },
    { id: 3, name: 'Maminha', qty: 10, unit: 'gleba', status: 'Baixo Estoque', price: '45.00' }
  ]);

  const addStockItem = (newItem) => {
    setInventory([{ ...newItem, id: Date.now(), status: 'Em Estoque' }, ...inventory]);
  };

  const currentItems = inventory.filter(item => item.unit === activeStock);

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <main className="flex-1 p-10 overflow-y-auto">
        <WelcomeBanner />
        <div className="max-w-7xl mx-auto">
          <StockSelector activeStock={activeStock} setActiveStock={setActiveStock} />
          <StockEntryForm activeStock={activeStock} onAdd={addStockItem} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatusCard title="Unidade Ativa" count={activeStock.toUpperCase()} color="blue" />
            <StatusCard title="Produtos" count={currentItems.length} color="green" />
            <StatusCard title="Peso Total" count={`${currentItems.reduce((a, b) => a + Number(b.qty), 0)}kg`} color="purple" />
          </div>
          <OrdersTable items={currentItems} stockName={activeStock} />
        </div>
      </main>
    </div>
  );
}

export default App;