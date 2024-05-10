
import './App.css';
import {Routes, Route} from 'react-router-dom'
import TransactionsList from './components/TransactionsList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<TransactionsList/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
