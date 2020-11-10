import { IGlobalContext, IUser } from "../contexts/global";

export const SetStorage = (key: string, data: string) => {
    window.localStorage.setItem(key, data);
}

export const GetStorage = (key: string) => {
    return window.localStorage.getItem(key);
}

export const deleteStorage = (key: string) => {
    return window.localStorage.removeItem(key);
}


export const Logout = () => {
    window.localStorage.clear();
    // window.location = "/auth"
}


export const isMobile = () => {
    let isMobile = false
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        isMobile = true;
    }
    return isMobile;
}

export const setContext = (context: IGlobalContext | null, obj: IUser) => {
    if(context?.setContext) {
        context.setContext({...context, user: {...obj}})
    }
}