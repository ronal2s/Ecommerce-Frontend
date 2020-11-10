import axios from "axios";

export async function getProducts(search?: string, minPrice?: number, maxPrice?: number) {
    const data = await axios.get("/products", { params: { search, minPrice, maxPrice } });
    return data.data;
}

export async function sendEmail() {
    axios.post("/email", { email: "test@gmail.com" })
        .then(res => alert(res.data))
        .catch(err => alert(err))
}

export async function requestRegister(form: { email: string, password: string, firstName: string, lastName: string, username: string }, callback: (result: any) => void) {
    axios.post("/register", form)
        .then(result => callback(result.data))
        .catch(error => callback(error))
}

export async function requestLogin(form: { username: string, password: string }, callback: (result: any) => void) {
    axios.post("/login", form)
        .then(result => callback(result.data))
        .catch(error => callback(error))
}