/* eslint-disable no-const-assign */
// import logo from './logo.svg';
import "./App.css";
import React, { useState, useEffect } from "react";
// import {BrowerRouter, Router} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./components/Searchbar";
import Searchbar from "./components/Searchbar";
import axios from "axios";
import ReactPaginate from "react-paginate";

function App() {
    const [products, setProducts] = useState([]);
    let [productImage, setProductImage] = useState("");
    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then((response) => response.json())
            .then((data) => setProductImage(data.message));
    }, []);
    useEffect(() => {
        console.log("Apps function component mounted..!");
        axios({
            method: "GET",
            url: "http://localhost:3001/products",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            setProducts(res.data);
            // console.log(products);
        });
    }, []);
    console.log("Console log outside useEffect method", products);

    const fetchData = async (currentPage) => {
        const res = await fetch(
            `http://localhost:3001/products?page=${currentPage}`
        );
        const data = res.json();
        return data;
    };

    const handlePageChange = async (data) => {
        console.log("handle PAge change data", data.selected);
        let currentPage = data.selected + 1;
        const productsFormserver = await fetchData(currentPage);
        setProducts(productsFormserver);
    };

    return (
        <>
            <div className="App">
                <Searchbar products={products} key={products.gtin} />
            </div>
            <div>
                <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={200}
                    marginPagesDisplayed={4}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>
        </>
    );
}

export default App;
