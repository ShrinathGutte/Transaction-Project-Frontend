import React, { useState, useEffect, useCallback } from 'react';
import productService from '../services/Product.service'; // Importing ProductService from the provided file

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await productService.getAllProductTransactions(selectedMonth);
        const { transactions, totalPages } = response.data;
        setTransactions(transactions);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchTransactions();
  }, [selectedMonth, searchText, currentPage]);
  
  

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <h2>Transactions List</h2>
      <select value={selectedMonth} onChange={handleMonthChange}>
        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>
      <input type="text" value={searchText} onChange={handleSearchTextChange} placeholder="Search transactions" />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default TransactionsList;
