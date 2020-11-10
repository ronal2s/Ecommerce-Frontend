import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    BrowserRouter as Router, Switch, Route, Redirect,
} from "react-router-dom";
//Screens
import Home from "./home";
//Custom components
import CustomAppBar from '../components/appbar';
//Utils
import { withNamespaces } from 'react-i18next';
//Custom styles
import { RowView, NavigationView, ContentView } from '../globalStyles';
import { GlobalContext } from '../contexts/global';
//Modals
import ModalRegister from "../modals/register";
import ModalLogin from "../modals/login";
import { deleteStorage, setContext } from '../utils/functions';
import { Keys } from '../utils/enums';

function App({ t }: any) {
    const [modals, setModals] = useState({ register: false, login: false });
    const [appbarButtons, setAppbarButtons] = useState([]);
    const globalContext = useContext(GlobalContext);

    useEffect(() => {
        let buttons = [];
        console.log("Aqui: ", globalContext)
        if (globalContext?.user.logged) {
            buttons = [({ text: t("Log out"), onClick: logout })]
        } else {
            buttons = [{ text: t("Log In"), onClick: () => openModal("login") },
            { text: t("Register"), onClick: () => openModal("register") }]
        }
        setAppbarButtons(buttons as any);
    }, [globalContext]);


    const logout = () => {
        deleteStorage(Keys.email);
        setContext(globalContext, { email: "", logged: false });
    }

    const openModal = (name: string) => setModals({ ...modals, [name]: true });
    const closeModal = (name: string) => setModals({ ...modals, [name]: false });

    return (
        <Router>
            <React.Fragment >
                <RowView >
                    <NavigationView>
                        <CustomAppBar title="E Commerce" rightButtons={appbarButtons} />
                        <ContentView>
                            <Switch>
                                <Route path="/" exact component={Home} />
                            </Switch>
                        </ContentView>
                    </NavigationView>
                </RowView>
                <ToastContainer />
            </React.Fragment>
            <ModalRegister open={modals.register} onClose={() => closeModal("register")} />
            <ModalLogin open={modals.login} onClose={() => closeModal("login")} />
        </Router>
    );
}

export default withNamespaces()(App);
