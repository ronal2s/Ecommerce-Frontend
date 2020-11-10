import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, FormControl, DialogActions, Button, ListItemSecondaryActionClassKey, Paper, Grid, CircularProgress } from "@material-ui/core";
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
import { getProducts } from "../../utils/api";

const url = "https://images.contentful.com/5de70he6op10/7KotRtmFAvP7OWLTE7PHjH/93bacf07d554c2f56531e16af54a3cd4/FurnitureGateway_03_sectionals.jpg";

function HomeView(props: any) {
    // const [form, setForm] = useState({ name: "Miguel", lastname: "Paulino", phone: "809413265" });
    const [itemModal, setItemModal] = useState(false);
    const [inputs, setInputs] = useState({ search: "", lowPrice: "", highPrice: "" });
    const [data, setData] = useState([]);
    const [backupData, setBackupData] = useState([]);
    const [loading, setLoading] = useState(true);
    const t = (props as any).t;

    useEffect(() => {
        const getData = async () => {
            const data = await getProducts();
            console.log("Data: ", data)
            setData(data);
            setBackupData(data);
            setLoading(false);
        }
        getData();
    }, [])

    const onViewMore = () => setItemModal(true);

    const closeViewMore = () => setItemModal(false);

    const onFilter = (value: string) => {
        let _data = [];
        if (value.length) {
            _data = data.filter((item: any) => item.Name.toLowerCase().startsWith(value.toLowerCase()))
        } else {
            _data = [...backupData];
            setInputs({ ...inputs, search: "" });
        }
        setData([..._data]);
    }

    const handleInputs = (name: string, value: string) => {
        setInputs({ ...inputs, [name]: value });
        switch (name) {
            case 'search': onFilter(value); break;
        }
    }


    return (
        <React.Fragment>
            {/* <Grid container justify="flex-start" > */}
            <Grid container justify="flex-start" spacing={1} >
                <Grid item sm={4} >
                    <Paper style={{ padding: 10 }}>
                        <TextField fullwidth variant="outlined" label="Filter" value={inputs.search} name="search" onChange={handleInputs} />
                        <Button onClick={() => onFilter("")} >Clear filter</Button>
                    </Paper>
                </Grid>
                <Grid item sm={8}>
                    <View centered >
                        {loading && <CircularProgress />}
                    </View>
                    {data.map((item: any, key) => {
                        return (
                            <Paper style={{ padding: 10, marginBottom: 10 }} >
                                <Grid container spacing={1} justify="flex-start" >
                                    <Grid item sm={3}>
                                        <Image url={item.Picture[0].thumbnails.large.url} width="100%" />
                                        <View color={COLORS.PRIMARY} marginTop={-5} >
                                            <Subtitle centered color="white">Size {item['Size (WxLxH)']}</Subtitle>
                                        </View>
                                    </Grid>
                                    <Grid item sm={8}>
                                        <Content flex alignItems="center" >
                                            <Title clickeable>{item.Name}</Title>
                                            {/* <Subtitle marginLeft={10} >14 x 19</Subtitle> */}
                                        </Content>
                                        <Subtitle>{item.Type}</Subtitle>
                                        <Price>US ${item['Unit Cost']}</Price>
                                        <Body>{item.Description.substr(0, 200)}...</Body>
                                        <Button onClick={onViewMore} >View more</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )
                    })}
                </Grid>
            </Grid>
            <ModalItem open={itemModal} onClose={closeViewMore} />
        </React.Fragment>
    )
}

export default withNamespaces()(HomeView);