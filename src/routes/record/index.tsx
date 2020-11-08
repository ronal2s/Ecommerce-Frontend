import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import {
    Chart,
    PieSeries,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';

import { withNamespaces } from 'react-i18next';
//Utils
import { isMobile } from "../../utils/functions";
import IRecord from "./index.d";
import { Title } from "../../globalStyles";

function Rent({ t }: any) {
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IRecord | null>(null);
    const [selectedRent, setSelectedRent] = useState(null);
    const [modalItems, setModalsItems] = useState(false);

    const [data, setdata] = useState([]);
    const [promData, setPromData] = useState([]);
    const [question1, setQuestion1] = useState([]);
    const [question2, setQuestion2] = useState([]);
    const [question3, setQuestion3] = useState([]);
    const [question4, setQuestion4] = useState([]);
    const [notParsedDate, setNotParseData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setLoading(true);
        axios.get("/api/surveys")
            .then(result => {
                console.log("/api/surveys", result.data)
                const aux = [];
                const chartQ1 = [
                    { label: t("Yes"), value: 0 },
                    { label: t("No"), value: 0 },
                ]
                const chartQ2 = [
                    { label: t("Yes"), value: 0 },
                    { label: t("No"), value: 0 },
                ]
                const chartQ3 = [
                    { label: t("Yes"), value: 0 },
                    { label: t("No"), value: 0 },
                ]
                const chartQ4 = [
                ]
                for (let i = 0; i < result.data.length; i++) {
                    const element = result.data[i];
                    aux.push({
                        user: element.user,
                        date: element.date,
                        answer1: element.questions[0].answer,
                        answer2: element.questions[1].answer,
                        answer3: element.questions[2].answer,
                        answer4: element.questions[3].answer,
                    });
                    //Chart data Q1
                    if (element.questions[0].answer == "Yes") chartQ1[0].value++;
                    if (element.questions[0].answer == "No") chartQ1[1].value++;
                    
                    //Chart data Q2
                    if (element.questions[1].answer == "Yes") chartQ2[0].value++;
                    if (element.questions[1].answer == "No") chartQ2[1].value++;
                    
                    //Chart data Q3
                    if (element.questions[2].answer == "Yes") chartQ3[0].value++;
                    if (element.questions[2].answer == "No") chartQ3[1].value++;
                    
                    //Chart data Q4
                    if(element.questions[3].answer) chartQ4.push({ label: element.questions[3].answer, value: 1 },)

                }
                setdata(aux as any)
                setQuestion1(chartQ1 as any);
                setQuestion2(chartQ2 as any);
                setQuestion3(chartQ3 as any);
                setQuestion4(chartQ4 as any);
                setLoading(false);
            })
            .catch(error => alert(error));
    }

    return (
        <React.Fragment>
            <Grid container justify="flex-start" spacing={2} >
                <Grid item sm={12} xs={12} >
                    <Paper>
                        <MaterialTable
                            style={{ width: isMobile() ? 350 : "100%" }}
                            title=""
                            options={{
                                exportButton: true,
                                search: false
                            }}
                            columns={[
                                { title: t("User"), field: "user" },
                                { title: t("Date"), field: "date" },
                                { title: t("Question1"), field: "answer1" },
                                { title: t("Question2"), field: "answer2" },
                                { title: t("Question3"), field: "answer3" },
                                { title: t("Question4"), field: "answer4" },
                            ]}
                            isLoading={loading}
                            data={data}
                        />
                    </Paper>
                </Grid>
                <Grid item sm={6} xs={12} >
                    <Title>{t("Question1")}</Title>
                    <Chart data={question1} >
                        <Legend />
                        <PieSeries valueField="value" argumentField="label" />
                    </Chart>
                </Grid>
                <Grid item sm={6} xs={12} >
                    <Title>{t("Question2")}</Title>
                    <Chart data={question2} >
                        <Legend />
                        <PieSeries valueField="value" argumentField="label" />
                    </Chart>
                </Grid>
                <Grid item sm={6} xs={12} >
                    <Title>{t("Question3")}</Title>
                    <Chart data={question3} >
                        <Legend />
                        <PieSeries valueField="value" argumentField="label" />
                    </Chart>
                </Grid>
                <Grid item sm={6} xs={12} >
                    <Title>{t("Question4")}</Title>
                    <Chart data={question4} >
                        <Legend />
                        <PieSeries valueField="value" argumentField="label" />
                    </Chart>
                </Grid>
            </Grid>

        </React.Fragment >
    )
}

export default withNamespaces()(Rent);