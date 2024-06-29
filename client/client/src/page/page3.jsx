import { useState, useEffect } from 'react';
import axios from "axios";

const Page = () => {
    const [products, setProducts] = useState('123');
    const handleClick = async () => {
        try {
            const response = await axios.get(
                "https://fakestoreapi.com/products/"
            ); // Thay thế URL API thực tế
            setProducts(response.data);
            console.log(products);
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    }

    return (
        <div>
            <h1>Page3</h1>
            <button onClick={() => handleClick()}>...</button>
            {
                products.map((item, index) => {
                    <div key={index}>
                        {/* <h1>{item.title}</h1> */}
                    </div>
                })
            }
        </div>

    );
};
export default Page;
