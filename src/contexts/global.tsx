import { createContext } from "react";

export interface IUser {
    logged: boolean,
    email?: string,
}

export interface IGlobalContext {
    user: IUser,
    setContext?: React.Dispatch<React.SetStateAction<IGlobalContext>>,
}

export const GlobalContext = createContext<IGlobalContext | null>(null);