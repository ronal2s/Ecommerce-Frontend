import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, FormControl, DialogActions, Button, ListItemSecondaryActionClassKey, Paper, Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import axios from "axios";
//Custom components
import TextField from "../../components/_textField";
import TextPicker from "../../components/_textSelect";
//Utils
import { withNamespaces } from "react-i18next";
import { GetStorage, SetStorage } from "../../utils/functions";
import { COLORS } from "../../utils/enums";
import Image from "../../components/image";
import { Subtitle, Title, Price, Body, Content, View } from "../../globalStyles";

import ModalItem from "./modalItem";

const url = "https://images.contentful.com/5de70he6op10/7KotRtmFAvP7OWLTE7PHjH/93bacf07d554c2f56531e16af54a3cd4/FurnitureGateway_03_sectionals.jpg";

function HomeView(props: any) {
    // const [form, setForm] = useState({ name: "Miguel", lastname: "Paulino", phone: "809413265" });
    const [itemModal, setItemModal] = useState(false);
    const [inputs, setInputs] = useState({ search: "", lowPrice: "", highPrice: "" });
    const t = (props as any).t;

    const onViewMore = () => setItemModal(true);

    const closeViewMore = () => setItemModal(false);

    const handleInputs = (name: string, value: string) => {
        setInputs({ ...inputs, [name]: value })
    }


    return (
        <React.Fragment>
            {/* <Grid container justify="flex-start" > */}
            <Grid container justify="flex-start" spacing={1} >
                <Grid item sm={4}>
                    <Paper style={{ padding: 10 }}>
                        <TextField fullwidth variant="outlined" label="Filter" value={inputs.search} name="search" onChange={handleInputs} />
                    </Paper>
                </Grid>
                <Grid item sm={8}>
                    <Paper style={{ padding: 10 }} >
                        <Grid container spacing={1} justify="flex-start" >
                            <Grid item sm={3}>
                                <Image url={url} width="100%" />
                                <View color={COLORS.PRIMARY} marginTop={-5} >
                                    <Subtitle centered color="white">Size 14 x 19</Subtitle>
                                </View>
                            </Grid>
                            <Grid item sm={8}>
                                <Content flex alignItems="center" >
                                    <Title clickeable>Soft Dog Pendant</Title>
                                    {/* <Subtitle marginLeft={10} >14 x 19</Subtitle> */}
                                </Content>
                                <Subtitle>Lighting</Subtitle>
                                <Price>US $249</Price>
                                <Body>Turquoise and ombre brown meld in glossy elliptical base, handcrafted of richly glazed ceramic. Linen shade gently tapers with complementary texture and neutral color.</Body>
                                <Button onClick={onViewMore} >View more</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <ModalItem open={itemModal} onClose={closeViewMore} />
        </React.Fragment>
    )
}

export default withNamespaces()(HomeView);