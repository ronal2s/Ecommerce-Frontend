import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Grid, Paper, Button } from "@material-ui/core";
import axios from "axios";
import { withNamespaces } from 'react-i18next';
//Modals
import ModalNew from "./new";
//Utils
import { isMobile } from "../../utils/functions";
import IUser from "./index.d";

function Users({ t }: any) {
    const [loading, setLoading] = useState(false);
    const [data, setdata] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IUser | null>(null);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        setLoading(true);
        axios.get("/api/users")
            .then(result => {
                console.log("/api/users", result.data)
                setdata(result.data)
                setLoading(false);
            })
            .catch(error => alert(error));
    }

    const deleteItem = (id?: number) => {
        axios.delete(`/api/users/delete/${id}`)
            .then(result => {
                setdata(result.data)
            })
            .catch(error => alert(error));
    }

    const editItem = (item: IUser) => {
        setSelectedItem(item);
        setModal(true);
    }

    const openmodal = () => {
        setSelectedItem(null);
        setModal(true);
    }

    const closemodal = () => {
        getData();
        setModal(false);
    }

    return (
        <React.Fragment>
            <Grid container justify="flex-start" >
                <Grid item sm={6} >
                    <Paper>
                        {/* <Typography variant="h2">Inventario</Typography> */}
                        <MaterialTable
                            style={{ width: isMobile() ? 350 : "100%" }}
                            title=""
                            options={{
                                exportButton: true,
                                search: false
                            }}
                            columns={[
                                { title: t("Fullname"), field: "fullname" },
                                { title: t("Role"), field: "role" },
                                {
                                    title: "", render: (tableData: IUser) => <div>
                                        <Button color="secondary" onClick={() => deleteItem(tableData.id)} >{t("Delete")}</Button>
                                        <Button color="primary" onClick={() => editItem(tableData)} >{t("Edit")}</Button>
                                    </div>
                                }
                            ]}
                            isLoading={loading}
                            data={data}
                        />
                        <br />
                        <div style={{ marginLeft: 10 }} >
                            <Button variant="contained" color="primary" onClick={openmodal} >{t("New")}</Button>
                        </div>
                        <br />
                    </Paper>
                </Grid>
            </Grid>
            <ModalNew open={modal} selectedItem={selectedItem} onClose={closemodal} />
        </React.Fragment>
    )
}

export default withNamespaces()(Users);