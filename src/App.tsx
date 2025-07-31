import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Notifications from './components/Notifications';
import Header from './components/Header';
import './App.css'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import ComparePage from './pages/ComparePage';



function App() {
   return (
    
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>

        <Notifications />
        <Header />
        <main className="pt-20">

        <Routes>
          <Route path="/" element={<Navigate to="/catalog" replace />} />

          <Route path="/catalog" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/compare" element={<ComparePage />} />

        </Routes>
        </main>
      </DndProvider>
    </BrowserRouter>
  );
}

export default App

