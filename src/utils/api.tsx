import axios from "axios";

export async function getProducts() {
    const data = await axios.get("/products");
    return data.data;
}