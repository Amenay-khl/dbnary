import { AppBar, colors, Grid, makeStyles, Tab, Tabs, Box, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MainBarChart } from "./mainBarChart";
import { NumberOfElements } from "../numberOfElements";
import { doAllLanguagesForNavBar, doNumberOfLexicalRelationsForFr, SparqlResponse, TypedValue } from "../wp-api";
import { LensTwoTone } from "@material-ui/icons";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};
function valueAsString(val: TypedValue): string {
    return val.value;
}
const types: Record<string, (tval: TypedValue) => any> = {
    Language: valueAsString
};
function normalizeSparqlData(response: SparqlResponse): Array<Record<string, any>> {
    const result: Array<Record<string, any>> = [];
    // console.log("Normalizing data");
    // console.log(response.results.bindings);
    if (response && response.results && response.results.bindings && response.results.bindings.length > 0) {
        response.results.bindings.forEach((record: Record<string, TypedValue>) => {
            const resultRec: Record<string, any> = {};
            Object.keys(record).forEach((key: string) => {
                if (types[key]) resultRec[key] = types[key](record[key]);
                else resultRec[key] = record[key].value;
            });
            result.push(resultRec);
        });
    }
    console.log("results");
    console.log(result);
    return result;
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
}));
export default function Navbar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [data, setData] = useState<Array<Record<string, any>>>([{ Language: "bg" }]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        doAllLanguagesForNavBar().then(normalizeSparqlData).then(setData);
    }, []);
    console.log("data :");
    console.log(data);
    let x = 1;
    return (
        <div>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {data.map((label, index) => (
                        <Tab label={label.Language} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <MainBarChart />
            </TabPanel>
            {data.map((label, index) => (
                <TabPanel value={value} index={index}>
                    <div>{label.Language}</div>
                </TabPanel>
            ))}
        </div>
    );
}
