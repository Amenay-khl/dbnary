import { colors, Grid, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { Component, FC, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
    doMainCountsForAllLexicalRelations,
    doMainCountsForAlltranslations,
    SparqlResponse,
    TypedValue
} from "../wp-api/sparql.get";
import { DecorationSpec } from "./styles";
import { format as d3Format } from "d3-format";
import { getEnglishName } from "../utils/iso636_1";
import BarGraph from "./barGraph";

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

    syn: valueAsInt,
    qsyn: valueAsInt,
    ant: valueAsInt,
    hyper: valueAsInt,
    hypo: valueAsInt,
    mero: valueAsInt,
    holo: valueAsInt,
    tropo: valueAsInt
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

const langNameFormatter = (label: any) => {
    return label instanceof Number ? <span>{label}</span> : <span>{getEnglishName(label)}</span>;
};

function groupBy(data, keyname) {
    let result = {};
    data.forEach((item) => {
        const key = item[keyname];
        result[key] = [...(result[key] || []), item];
    });
    return Object.values(result);
}

function pivot(data) {
    return data.reduce(
        (accumulator, { Languages, count, ...rest }) => ({
            ...accumulator,
            ...rest,
            [Languages]: count
        }),
        []
    );
}

const MainBarChart: FC<MainBarChartProps> = ({ decorations, provider, ...rest }) => {
    const [data, setData] = useState<Array<Record<string, any>>>([
        {
            l: "bg",
            maxversion: "20210620",
            Languages: "it",
            count: "1202"
        }
    ]);
    const classes = useStyles();
    let inputLabels = [
        { key: "tr", color: "#ff00ff" },
        { key: "ru", color: "#34495E" },
        { key: "pt", color: "#fdff00" },
        { key: "others", color: "#F39C12" },
        { key: "number_of_languages", color: "#B3B6B7" },
        { key: "mul", color: "#229954" },
        { key: "ja", color: "#F9E79F" },
        { key: "id", color: "#48C9B0" },
        { key: "it", color: "#85C1E9" },
        { key: "fr", color: "#2471A3" },
        { key: "fi", color: "#5B2C6F" },
        { key: "en", color: "#C39BD3" },
        { key: "de", color: "#ff4f00" },
        { key: "el", color: "#7B241C" }
    ];

    useEffect(() => {
        doMainCountsForAlltranslations().then(normalizeSparqlData).then(setData);
    }, []);

    const result = groupBy(data, "l").map(pivot);

    console.log(data);
    console.log(result);

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
            <Grid item xs={12} xl={6}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarGraph title="test" data={result} labels={inputLabels} />

                    {/* <BarChart
                        data={result}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="l" tick={<XAxisLanguageTick />} />
                        <YAxis type="number" tick={<YAxisNumberTick />} />
                        <Tooltip labelFormatter={langNameFormatter} />
                        <Legend />
                        <Bar dataKey="de" stackId="a" fill="#7B241C" />
                        <Bar dataKey="el" stackId="a" fill="#ff4f00 " />
                        <Bar dataKey="en" stackId="a" fill="#C39BD3" />
                        <Bar dataKey="fi" stackId="a" fill="#5B2C6F " />
                        <Bar dataKey="fr" stackId="a" fill="#2471A3" />
                        <Bar dataKey="it" stackId="a" fill="#85C1E9" />
                        <Bar dataKey="id" stackId="a" fill="#48C9B0" />
                        <Bar dataKey="ja" stackId="a" fill="#229954" />
                        <Bar dataKey="mul" stackId="a" fill="#F9E79F" />
                        <Bar dataKey="number_of_languages:" stackId="a" fill="#B3B6B7" />
                        <Bar dataKey="others:" stackId="a" fill="#F39C12" />
                        <Bar dataKey="pt" stackId="a" fill="#fdff00" />
                        <Bar dataKey="ru" stackId="a" fill="#34495E " />
                        <Bar dataKey="tr" stackId="a" fill="#ff00ff" />
                    </BarChart> */}
                </ResponsiveContainer>
            </Grid>
        </Grid>
    );
};

export { MainBarChart };
