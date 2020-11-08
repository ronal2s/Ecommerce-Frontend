import React, { useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    BrowserRouter as Router, Switch, Route, Redirect,
} from "react-router-dom";
//Screens
import Survey from "./survey";
//Custom components
import CustomAppBar from '../components/appbar';
//Utils
import { withNamespaces } from 'react-i18next';
//Custom styles
import { RowView, NavigationView, ContentView } from '../globalStyles';
import { GlobalContext } from '../contexts/global';

function App({ t }: any) {    
    const globalContext = useContext(GlobalContext);

    // alert(globalContext?.user.rol)
    return (
        <Router>
            <React.Fragment >
                <RowView >                   
                    <NavigationView>
                        <CustomAppBar title="E Commerce" rightButtons={[
                            {text: "Login", onClick: () => console.log()},
                            {text: "Register", onClick: () => console.log()},
                        ]} />
                        <ContentView>
                            <Switch>
                                <Route path="/" exact component={Survey} />  
                            </Switch>
                        </ContentView>
                    </NavigationView>
                </RowView>
                <ToastContainer />
            </React.Fragment>
        </Router>
    );
}

export default withNamespaces()(App);
