import React, { useEffect, useState } from "react";
import { Button, Paper, Grid, CircularProgress, IconButton, Icon } from "@material-ui/core";
//Custom components
import TextField from "../../components/_textField";
//Utils
import { withNamespaces } from "react-i18next";
import { COLORS } from "../../utils/enums";
import Image from "../../components/image";
import { Subtitle, Title, Price, Body, Content, View } from "../../globalStyles";

import ModalItem from "./modalItem";
import { getProducts } from "../../utils/api";


function HomeView(props: any) {
    // const [form, setForm] = useState({ name: "Miguel", lastname: "Paulino", phone: "809413265" });
    const [itemModal, setItemModal] = useState(false);
    const [inputs, setInputs] = useState({ search: "", lowPrice: "", highPrice: "" });
    const [selectedItem, setSelectedItem] = useState(null);
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

    const onViewMore = (item: any) => {
        setItemModal(true);
        setSelectedItem(item)
    }

    const closeViewMore = () => setItemModal(false);

    const onFilter = async (value: string) => {
        let _data: never[] = [];
        if (value.length) {
            _data = data.filter((item: any) => item.Name.toLowerCase().startsWith(value.toLowerCase()));
            // _data = await getProducts(value); //Fetching data from server
        } else {
            _data = [...backupData];
            setInputs({ ...inputs, search: "", lowPrice: "", highPrice: "" });
        }
        setData([..._data]);
    }

    const onFilterPrice = () => {
        const low: number = parseInt(inputs.lowPrice);
        const high: number = parseInt(inputs.highPrice);
        if (low > 0 && high > 0) {
            let _data = [];
            if (high < low) {
                setInputs({ ...inputs, lowPrice: high.toString(), highPrice: low.toString() });
                _data = data.filter((item: any) => item["Unit Cost"] >= high && item["Unit Cost"] <= low);
            } else {
                _data = data.filter((item: any) => item["Unit Cost"] >= low && item["Unit Cost"] <= high);
            }
            setData([..._data]);
        }
        if (isNaN(low) && high > 0) {
            let _data = [];
            _data = data.filter((item: any) => item["Unit Cost"] <= high);
            setData([..._data]);
        }
        if (isNaN(high) && low > 0) {
            let _data = [];
            _data = data.filter((item: any) => item["Unit Cost"] >= low);
            setData([..._data]);
        }
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
                <Grid item sm={4} xs={12} >
                    <Paper style={{ padding: 10 }}>
                        <TextField fullwidth variant="outlined" label="Search" value={inputs.search} name="search" onChange={handleInputs} />
                        <Subtitle>Price</Subtitle>
                        <Grid container spacing={2}>
                            <Grid item sm={4}>
                                <TextField fullwidth variant="outlined" label="Min" value={inputs.lowPrice} name="lowPrice" onChange={handleInputs} />
                            </Grid>
                            <Grid item sm={4}>
                                <TextField fullwidth variant="outlined" label="High" value={inputs.highPrice} name="highPrice" onChange={handleInputs} />
                            </Grid>
                            <Grid item sm={2}>
                                <View centered>
                                    <IconButton onClick={onFilterPrice} >
                                        <Icon fontSize="large" >search</Icon>
                                    </IconButton>
                                </View>
                            </Grid>
                        </Grid>
                        <Button onClick={() => onFilter("")} >Clear filter</Button>
                    </Paper>
                </Grid>
                <Grid item sm={8} xs={12}>
                    <View centered >
                        {loading && <CircularProgress />}
                    </View>
                    {data.map((item: any, key) => {
                        return (
                            <Paper style={{ padding: 10, marginBottom: 10, backgroundColor: item["Units In Store"] ? undefined : COLORS.GRAY }} >
                                <Grid container spacing={1} justify="flex-start" >
                                    <Grid item sm={3}>
                                        <Image url={item.Picture[0].thumbnails.large.url} width="100%" />
                                        <View color={item["Units In Store"] ? COLORS.DARK_GRAY : COLORS.RED} marginTop={-5} >
                                            {item["Units In Store"] > 0 && <Subtitle centered color="white">Size {item['Size (WxLxH)']}</Subtitle>}
                                            {!item["Units In Store"] && <Subtitle centered color="white">No stocks available</Subtitle>}
                                        </View>
                                    </Grid>
                                    <Grid item sm={8}>
                                        <Content flex alignItems="center" >
                                            <Title clickeable>{item.Name}</Title>
                                        </Content>
                                        <Subtitle>{item.Type}</Subtitle>
                                        <Price>US ${item['Unit Cost']}</Price>
                                        <Body>{item.Description.substr(0, 200)}...</Body>
                                        <Button onClick={() => onViewMore(item)} >View more</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )
                    })}
                </Grid>
            </Grid>
            {selectedItem && <ModalItem open={itemModal} onClose={closeViewMore} selectedItem={selectedItem} />}
        </React.Fragment>
    )
}

export default withNamespaces()(HomeView);