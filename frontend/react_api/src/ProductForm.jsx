import React, { useState } from "react";
import axios from "axios";

export function ProductForm() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        const product = {
            name: name,
            price: Number(price),
            qty: Number(qty)
        };

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/api/products/",
                product
            );

            alert("Product Added Successfully!");

            console.log(response.data);

            setName("");
            setPrice("");
            setQty("");

        } catch (error) {

            console.log(error.response?.data || error.message);

            alert("Product insertion failed");

        }
    };

    return (

        <div>

            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Product Quantity"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit">
                    Save Product
                </button>

            </form>

        </div>
    );
}


