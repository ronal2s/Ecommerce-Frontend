import axios from "axios";
import { Keys } from "./enums";
import { GetStorage } from "./functions";

export async function getProducts(search?: string, minPrice?: number, maxPrice?: number) {
    const data = await axios.get("/products", { params: { search, minPrice, maxPrice } });
    return data.data;
}

export async function sendEmail(product: any, callback: (result: any) => void) {
    axios.post("/email", { email: GetStorage(Keys.email), product })
        .then(res => callback(res.data))
        .catch(err => {
            alert("Email error: " + err);
        })
}

export async function requestRegister(form: { email: string, password: string, firstName: string, lastName: string, username: string }, callback: (result: any) => void) {
    axios.post("/register", form)
        .then(result => callback(result.data))
        .catch(error => {
            alert("Register error: " + error);
        })
}

export async function requestLogin(form: { username: string, password: string }, callback: (result: any) => void) {
    axios.post("/login", form)
        .then(result => callback(result.data))
        .catch(error => {
            alert("Login error: " + error);
        })
}