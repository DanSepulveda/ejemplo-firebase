import './App.css';
import { Routes, Route } from 'react-router-dom'
import Contact from './views/Contact'
import Home from './views/Home'
import Mensajes from './views/Mensajes';
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/contacto' element={<Contact /> } />
        <Route path='/' element={<Home />} />
        <Route path='/mensajes' element={<Mensajes /> } />
      </Routes>
    </Layout>

  );
}

export default App;
