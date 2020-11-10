import React, { useState } from "react";
import { Dialog, DialogContent, DialogActions, Button, Grid } from "@material-ui/core";
import { toast } from "react-toastify";
//Custom components
import TextField from "../components/_textField";
//Utils
import { requestRegister } from "../utils/api";
import models from "../utils/models";
import { Title } from "../globalStyles";

interface IModal {
    open: boolean,
    onClose: () => void,
}

function ModalItem(props: IModal) {
    const [form, setForm] = useState({ ...models.register });

    const onEntering = () => {
        setForm({ ...models.register });
    }

    const handleInputs = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    }

    const onRegister = () => {
        requestRegister(form, (result: any) => {            
            toast[result.error?"error":"success"](result.msg);
            if(!result.error) {
                props.onClose();
            }
        })
    }
    return (
        <Dialog open={props.open} onClose={props.onClose} onEntering={onEntering} maxWidth="sm" fullWidth >
            <DialogContent>
                <Title>Register</Title>
                <TextField size={2} label="Username" value={form.username} name="username" onChange={handleInputs} />
                <Grid container spacing={1}>
                    <TextField size={6} label="First Name" value={form.firstName} name="firstName" onChange={handleInputs} />
                    <TextField size={6} label="Last Name" value={form.lastName} name="lastName" onChange={handleInputs} />
                    <TextField size={6} label="Email" value={form.email} name="email" onChange={handleInputs} />
                    <TextField size={6} label="Password" value={form.password} name="password" password onChange={handleInputs} />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={props.onClose} >Close</Button>
                <Button color="primary" onClick={onRegister} >Register</Button>
            </DialogActions>
        </Dialog>

    )
}

export default ModalItem;