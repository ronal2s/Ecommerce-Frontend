import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, FormControl, DialogActions, Button, ListItemSecondaryActionClassKey, Paper, Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import axios from "axios";
//Custom components
import TextField from "../../components/_textField";
import TextPicker from "../../components/_textSelect";
//Utils
import models from "../../utils/models";
import { withNamespaces } from "react-i18next";
import { GetStorage, SetStorage } from "../../utils/functions";
import { Keys } from "../../utils/enums";
import Image from "../../components/image";
import { Subtitle, Title, Price, Body, Content } from "../../globalStyles";

SetStorage(Keys.User, "ronal2s");

const url = "https://images.contentful.com/5de70he6op10/7KotRtmFAvP7OWLTE7PHjH/93bacf07d554c2f56531e16af54a3cd4/FurnitureGateway_03_sectionals.jpg";

function HomeView(props: any) {
    // const [form, setForm] = useState({ name: "Miguel", lastname: "Paulino", phone: "809413265" });
    const [form, setForm] = useState({ ...models.questions });
    const t = (props as any).t;




    return (
        <React.Fragment>
            {/* <Grid container justify="flex-start" > */}
            <Grid container justify="flex-start" >
                <Grid item sm={8}>
                    <Paper style={{ padding: 10 }} >
                        <Grid container spacing={1} justify="flex-start" >
                            <Grid item sm={3}>
                                <Image url={url} width="100%" />
                            </Grid>
                            <Grid item sm={8}>
                                <Content flex alignItems="center" >
                                    <Title clickeable>Soft Dog Pendant</Title>
                                    <Subtitle marginLeft={10} >14 x 19</Subtitle>
                                </Content>
                                <Subtitle>Lighting</Subtitle>
                                <Price>US $249</Price>
                                <Body>Turquoise and ombre brown meld in glossy elliptical base, handcrafted of richly glazed ceramic. Linen shade gently tapers with complementary texture and neutral color.</Body>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default withNamespaces()(HomeView);