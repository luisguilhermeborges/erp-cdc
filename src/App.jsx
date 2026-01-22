import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import WelcomeBanner from './components/WelcomeBanner';
import StockSelector from './components/StockSelector';
import OrdersTable from './components/OrdersTable';
import StatusCard from './components/StatusCard';
import StockEntryForm from './components/StockEntryForm';

function App() {
  const [activeStock, setActiveStock] = useState('matriz');
  const [searchTerm, setSearchTerm] = useState(''); // Estado para a busca
  
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('inventory');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Picanha', qty: 50, unit: 'matriz', status: 'Em Estoque', price: '89.90' },
      { id: 2, name: 'Contra Filé', qty: 30, unit: 'alphaville', status: 'Em Estoque', price: '65.00' },
      { id: 3, name: 'Maminha', qty: 4, unit: 'gleba', status: 'Baixo Estoque', price: '45.00' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  const addStockItem = (newItem) => {
    const status = newItem.qty <= 5 ? 'Baixo Estoque' : 'Em Estoque';
    setInventory([{ ...newItem, id: Date.now(), status }, ...inventory]);
  };

  const deleteItem = (id) => {
    if(window.confirm("Tem certeza que deseja excluir este item?")) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  // Filtro combinado: Unidade + Termo de Busca
  const currentItems = inventory.filter(item => 
    item.unit === activeStock && 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <StatusCard title="Produtos Encontrados" count={currentItems.length} color="green" />
            <StatusCard 
              title="Peso Total (Filtrado)" 
              count={`${currentItems.reduce((a, b) => a + Number(b.qty), 0).toFixed(2)}kg`} 
              color="purple" 
            />
          </div>

          <OrdersTable 
            items={currentItems} 
            stockName={activeStock} 
            onDelete={deleteItem}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </main>
    </div>
  );
}

export default App;