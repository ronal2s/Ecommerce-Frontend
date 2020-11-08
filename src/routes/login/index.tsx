import React, { useState, useContext } from "react";
import { Title, View, SquareView, Separator } from "../../globalStyles";
import { Button, CircularProgress } from "@material-ui/core";
import { withNamespaces } from "react-i18next";
import { toast } from "react-toastify";
import axios from "axios";
//Custom components
import TextField from "../../components/_textField";
import { COLORS, Keys } from "../../utils/enums";
//Services
import { SetStorage } from "../../utils/functions";
import { GlobalContext, IUser } from "../../contexts/global";

function Login({ t }: any) {
    const [form, setform] = useState({ username: "admin", password: "mayonesa" });
    const [loading, setLoading] = useState(false);
    const globalContext = useContext(GlobalContext);

    const handleInputs = (name: string, value: string) => {
        setform({ ...form, [name]: value });
        console.log(form)
    }

    const logIn = async () => {
        axios.post("/api/login", { user: form.username, password: form.password })
            .then(result => {
                console.log("Login data:", result.data)
                if (result.data.rol) {
                    // alert("si")
                    const obj = { user: { logged: true, fullname: result.data.fullname, rol: result.data.rol } }
                    globalContext?.setContext({ ...obj as any });
                    SetStorage(Keys.User, form.username);
                    SetStorage(Keys.Role, result.data.rol);
                } else {
                    toast.error(t("Password doesn't match"));
                }
            })
    }

    return (
        <React.Fragment>
            <View centered fullsize color={COLORS.PRIMARY} >
                <SquareView  >
                    <Separator />
                    <Title centered >P R A C T I C A  4</Title>
                    <Separator />
                    <View centered column >
                        <TextField label={t("User")} variant="filled" name="username" value={form.username} onChange={handleInputs} />
                        <Separator />
                        <TextField label={t("Password")} variant="filled" name="password" password value={form.password} onChange={handleInputs} />
                        <Separator />
                        <Separator />
                        <Button color="primary" variant="outlined" onClick={logIn} >
                            {loading && <CircularProgress size={20} />}
                            {!loading && t("Login")}
                        </Button>
                    </View>
                </SquareView>
            </View>
        </React.Fragment>
    )
}

export default withNamespaces()(Login);