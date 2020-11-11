import React, { useContext, useState } from "react";
import { Dialog, DialogContent, DialogActions, Button, Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import { withNamespaces } from "react-i18next";
//Custom components
import TextField from "../components/_textField";
//Utils
import { requestRegister } from "../utils/api";
import models from "../utils/models";
import { Title } from "../globalStyles";
import { encodePass, setContext, SetStorage } from "../utils/functions";
import { Keys } from "../utils/enums";
import { GlobalContext } from "../contexts/global";

interface IModal {
    open: boolean,
    onClose: () => void,
}

function ModalItem(props: IModal | any) {
    const [form, setForm] = useState({ ...models.register });
    const globalContext = useContext(GlobalContext);
    const t = (props as any).t;


    const onEntering = () => {
        setForm({ ...models.register });
    }

    const handleInputs = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    }
    const onRegister = () => {
        const obj = { ...form };
        obj.password = encodePass(form.password);
        requestRegister(obj, (result: any) => {
            toast[result.error ? "error" : "success"](t(result.msg));
            if (!result.error) {
                props.onClose();
                SetStorage(Keys.email, result.email);
                setContext(globalContext, { email: result.email, logged: true });
            }
        })
    }
    return (
        <Dialog open={props.open} onClose={props.onClose} onEntering={onEntering} maxWidth="sm" fullWidth >
            <DialogContent>
                <Title>{t("Register")}</Title>
                <TextField size={2} label={t("Username")} value={form.username} name="username" onChange={handleInputs} />
                <Grid container spacing={1}>
                    <TextField size={6} label={t("First Name")} value={form.firstName} name="firstName" onChange={handleInputs} />
                    <TextField size={6} label={t("Last Name")} value={form.lastName} name="lastName" onChange={handleInputs} />
                    <TextField size={6} label={t("Email")} value={form.email} name="email" onChange={handleInputs} />
                    <TextField size={6} label={t("Password")} value={form.password} name="password" password onChange={handleInputs} />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={props.onClose} >{t("Close")}</Button>
                <Button color="primary" onClick={onRegister} >{t("Register")}</Button>
            </DialogActions>
        </Dialog>

    )
}

export default withNamespaces()(ModalItem);