import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, FormControl, DialogActions, Button, ListItemSecondaryActionClassKey } from "@material-ui/core";
import { toast } from "react-toastify";
import axios from "axios";
//Custom components
import TextField from "../../components/_textField";
import TextPicker from "../../components/_textSelect";
//Utils
import IUser from "./index.d";
import models from "../../utils/models";
import i18n from "../../utils/i18n";
import { withNamespaces } from "react-i18next";

interface IModalNew {
    open: boolean,
    selectedItem: IUser | null,
    onClose: () => void,

}

function ModalNew(props: IModalNew | any) {
    // const [form, setForm] = useState({ name: "Miguel", lastname: "Paulino", phone: "809413265" });
    const [form, setForm] = useState({ ...models.user });
    const t = (props as any).t;

    const onEntering = () => {
        if (props.selectedItem) {
            setForm({ ...props.selectedItem as any })
        }
    }

    const onClose = () => {
        setForm({ ...models.user });
        props.onClose();
    }

    const handleInputs = (name: string, value: any) => {
        setForm({ ...form, [name]: value });
    }

    const addNewItem = () => {
        // axios.post("/api/students", { matricula: 20200102, name: "Junior", lastname: "Mosquea", phone: "8293733603" })
        if (props.selectedItem) {
            axios.put("/api/users", { ...form, id: props.selectedItem.id })
                .then(result => {
                    console.log("Resultado: ", result);
                    const typeToast = !result.data ? "error" : "success";
                    const msg = !result.data ? t("An error has ocurred") : "Item updated successfully";
                    toast[typeToast](msg);
                    if (!result.data.error) props.onClose();
                })
                .catch(error => alert(error))
        } else {
            axios.post("/api/users", { ...form })
                .then(result => {
                    console.log("Resultado: ", result);
                    const typeToast = !result.data.id ? "error" : "success";
                    const msg = !result.data.id ? t("An error has ocurred") : t("Item added successfully");
                    toast[typeToast](msg);
                    if (!result.data.error) props.onClose();
                })
                .catch(error => alert(error))
        }
    }


    return (
        <Dialog open={props.open} onClose={onClose} onEntering={onEntering} >
            <DialogTitle>{props.selectedItem ? t("Update") : t("New")} {t("User")}</DialogTitle>
            <DialogContent>
                <FormControl>
                    <TextField label={t("Fullname")} name="fullname" value={form.fullname} onChange={handleInputs} />
                    <TextField label={t("User")} name="user" value={form.user} onChange={handleInputs} />
                    {/* <TextField label="Role" name="role" value={form.role} onChange={handleInputs} /> */}
                    <TextPicker label={t("Role")} name="role" list={["ADMIN", "USER"]} value={form.role} onChange={handleInputs} />
                    <TextField label={t("Password")} name="password" value={form.password} password onChange={handleInputs} />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={() => props.onClose()} >{t("Close")}</Button>
                <Button variant="contained" color="primary" onClick={addNewItem} >
                    {t("Accept")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withNamespaces()(ModalNew);