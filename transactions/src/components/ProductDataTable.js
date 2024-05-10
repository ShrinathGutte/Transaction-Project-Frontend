import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProductService from "../services/Product.service";

const ProductDataTable = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setProductData();
  }, []);

  const setProductData = () => {
    ProductService.getAllProduct().then((response) => {
      setProducts(response.data);
    });
  };

  const removeProduct = (id) => {
    ProductService.deleteProduct(id)
      .then((response) => {
        setProductData();
        navigate("/productdata");
      })
      .catch((error) => {
        alert("Error Ocurred in removeEmployee:" + error);
      });
  };

  const handleSort = (column) => {
    const sorted = [...products].sort((a, b) => a[column] - b[column]);
    setProducts(sorted);
  };
  const handleSort2 = (column) => {
    const sorted = [...products].sort((a, b) => b[column] - a[column]);
    setProducts(sorted);
  };

  const stringSortasc = (column) => {
    const sorted = [...products].sort((a, b) =>
      a[column] > b[column] ? 1 : -1
    );
    setProducts(sorted);
  };

  const stringSortdesc = (column) => {
    const sorted = [...products].sort((a, b) =>
      a[column] > b[column] ? -1 : 1
    );
    setProducts(sorted);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredData = products.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setProducts(filteredData);
  };

  return (
    <div>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      <div className="conatiner-fluid bg-secondary">
        <div className="row vh-100">
          <div className="col-md-12">
            <h1 className="mb-2">Product Transactions</h1>

            <input
              className="mb-4"
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
            />

            <h4 className="text-white">Show All Products</h4>
              <div className="container">
              <div className="row">
                <div className="col-12">
                  
                  <table className="table table-bordered table-striped table-dark">
                    <thead>
                      <tr>
                        <th
                          onClick={() => handleSort("id")}
                          onDoubleClick={() => handleSort2("id")}
                        >
                          Id
                          <span class="glyphicon glyphicon-filter"></span>
                        </th>
                        <th
                          onClick={() => stringSortasc("name")}
                          onDoubleClick={() => stringSortdesc("name")}
                        >
                          Name
                          <span class="glyphicon glyphicon-filter"></span>
                        </th>
                        <th
                          onClick={() => stringSortasc("category")}
                          onDoubleClick={() => stringSortdesc("category")}
                        >
                          Category
                          <span class="glyphicon glyphicon-filter"></span>
                        </th>
                        <th
                          onClick={() => handleSort("price")}
                          onDoubleClick={() => handleSort2("price")}
                        >
                          Price
                          <span class="glyphicon glyphicon-filter"></span>
                        </th>
                        <th>Delete</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr>
                          <th scope="row">{product.id}</th>
                          <td>{product.title}</td>
                          <td>{product.description}</td>
                          <td>{product.category}</td>
                          <td>{product.price}</td>
                          <td>{product.dateOfSale}</td>
                          <td>
                            {" "}
                            <button
                              onClick={() => {
                                removeProduct(product.id);
                              }}
                              className="btn btn-primary"
                            >
                              DELETE
                            </button>
                          </td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default ProductDataTable;
