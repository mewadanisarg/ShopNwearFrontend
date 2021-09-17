import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import ReactPaginate from "react-paginate";

function Pagination(params) {
    const [products, setProducts] = useState([]);
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
export default Pagination;
