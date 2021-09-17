// import Axios from "axios";
import React from "react";
import "../searchbar.css";
import { MDBCol, MDBIcon } from "mdbreact";

const Searchbar = (props) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    React.useEffect(() => {
        const results = props.products.filter((product) =>
            product.title.includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm]);
    return (
        <div key={props.products.gtin}>
            <div className="input-group md-form form-sm form-1 pl-0">
                <div className="input-group-prepend">
                    <span
                        className="input-group-text purple lighten-3"
                        id="basic-text1"
                    >
                        <MDBIcon className="text-white" icon="search" />
                    </span>
                </div>
                <input
                    className="form-control my-0 py-1"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    value={props.products.title}
                    onChange={handleChange}
                />
                <div className="productcontainer">
                    {searchResults.map((item) => (
                        <div key={item.gtin} className="itemcontainer">
                            <div className="productimage">
                                <img src={item.image_link} width="250px" />
                            </div>
                            <h4>Product id: {item.gtin}</h4>
                            <p>{item.title}</p>
                            <h5>
                                Sale Price: <b>{item.sale_price}</b>
                            </h5>
                            <h6>Price: {item.price}</h6>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Searchbar;
