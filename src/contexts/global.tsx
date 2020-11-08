import { createContext } from "react";

export interface IUser {
    logged: boolean,
    fullname?: string,
    rol?: string,
}

export interface IGlobalContext {
    user: IUser,
    setContext: React.Dispatch<React.SetStateAction<IUser>>,
}

export const GlobalContext = createContext<IGlobalContext | null>(null);