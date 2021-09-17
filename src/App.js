import "./App.css";
import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./components/Searchbar";
import Pagination from "./components/Pagination";
import Searchbar from "./components/Searchbar";
import axios from "axios";

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

    return (
        <>
            <div className="App">
                <Searchbar products={products} key={products.gtin} />
            </div>
            <div>
                <Pagination />
            </div>
        </>
    );
}

export default App;
