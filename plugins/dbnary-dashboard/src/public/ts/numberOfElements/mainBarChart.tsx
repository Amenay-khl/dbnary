import { colors, Grid, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { Component, FC, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { doMainCountsForAllLanguages, SparqlResponse, TypedValue } from "../wp-api/sparql.get";
import { DecorationSpec } from "./styles";
import { format as d3Format } from "d3-format";
import { getEnglishName } from "../utils/iso636_1";
<<<<<<< HEAD
import * as css from "./style.css";
import BarGraph from "./BarChart";
=======
import Dialog from "@material-ui/core/Dialog";
import BarGraph from "./barGraph";
>>>>>>> 60b0012fe911d2b31aa053ec5a4b2f19e514f9c7

function valueAsString(val: TypedValue): string {
    return val.value;
}

function valueAsInt(val: TypedValue): number {
    return parseInt(val.value);
}

/* The decorations to provide to the generic barchart */
type MainBarChartProps = { decorations: Record<string, DecorationSpec>; provider: () => Promise<SparqlResponse> };

const types: Record<string, (tval: TypedValue) => any> = {
    Language: valueAsString,
    Version: valueAsString,
    Entries: valueAsInt,
    Vocables: valueAsInt,
    Translations: valueAsInt,
    Senses: valueAsInt
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
    // console.log(result);
    return result;
}

//const kbDomain = [0, (d) => d3Max([d.setsize, d.getsize])];
//const kbScale = d3ScaleLinear().domain(kbDomain).range([0, 1]);
const kbTickFormat = d3Format(".2s");

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%"
    },
    greyBackground: {
        backgroundColor: colors.grey[100]
    }
}));

const XAxisLanguageTick: FC<any> = ({ x, y, payload }) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={12}
                textAnchor="middle"
                fill="#666"
                fontSize="0.7rem"
                fontFamily="Roboto, sans-serif, Helvetica, Arial"
            >
                {payload.value}
            </text>
        </g>
    );
};

const YAxisNumberTick: FC<any> = (props) => {
    const { x, y, payload } = props;
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                textAnchor="end"
                fill="#666"
                fontSize="0.7rem"
                fontFamily="Roboto, sans-serif, Helvetica, Arial"
            >
                {kbTickFormat(payload.value)}
            </text>
        </g>
    );
};

const langNameFormatter = (label: any) => {
    return label instanceof Number ? <span>{label}</span> : <span>{getEnglishName(label)}</span>;
};

const MainBarChart: FC<MainBarChartProps> = ({ decorations, provider, ...rest }) => {
    const [data, setData] = useState<Array<Record<string, any>>>(null);
    const [isOpen, setState] = useState(false);
    const handleClose = () => {
        setState(false);
    };

    const classes = useStyles();
    let inputLabels = [
        { key: "Vocables", color: decorations["vocable"].color },
        { key: "Entries", color: decorations["entry"].color },
        { key: "Senses", color: decorations["sense"].color },
        { key: "Translations", color: decorations["translation"].color }
    ];

    let inputLabels = [
        { key: "Vocables", color: "#fdff00" },
        { key: "Entries", color: "#3ab09e" },
        { key: "Senses", color: "#ff4f00" },
        { key: "Translations", color: "#000080" }
    ];

    useEffect(() => {
        doMainCountsForAllLanguages().then(normalizeSparqlData).then(setData);
    }, []);

    return (
        <Grid
            container
            item
            xs={12}
            spacing={3}
            justify="space-between"
            alignItems="center"
            className={clsx(classes.root)}
            {...rest}
        >
            <Grid onClick={() => setState(!isOpen)} item xs={12} xl={6}>
                <ResponsiveContainer width="100%" height={300}>
<<<<<<< HEAD
                    <BarGraph title="test" data={data} labels={inputLabels} />
=======
                    <BarGraph title="test" data={data} labels={inputLabels} open={false} />
>>>>>>> 60b0012fe911d2b31aa053ec5a4b2f19e514f9c7
                </ResponsiveContainer>
            </Grid>
            {isOpen && (
                <Dialog
                    open
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth={true}
                    maxWidth={"md"}
                >
                    <ResponsiveContainer width="100%" height={300}>
                        <BarGraph title="test" data={data} labels={inputLabels} open={isOpen} />
                    </ResponsiveContainer>
                </Dialog>
            )}
        </Grid>
    );
};

export { MainBarChart };
