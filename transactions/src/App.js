
import './App.css';
import {Routes, Route} from 'react-router-dom'
import TransactionsList from './components/TransactionsList';
import ProductDataTable from './components/ProductDataTable';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/transactions' element={<TransactionsList/>}></Route>
        <Route path='/' element={<ProductDataTable/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
