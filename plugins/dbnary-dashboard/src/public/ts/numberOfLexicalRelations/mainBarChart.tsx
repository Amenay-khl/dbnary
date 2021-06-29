import { colors, Grid, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { Component, FC, useEffect, useState } from "react";
import { ResponsiveContainer } from "recharts";
import { doMainCountsForAllLexicalRelations, SparqlResponse, TypedValue } from "../wp-api/sparql.get";
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
        (accumulator, { nym, count, ...rest }) => ({
            ...accumulator,
            ...rest,
            [nym.split("#")[1]]: count
        }),
        []
    );
}

const MainBarChart: FC<MainBarChartProps> = ({ decorations, provider, ...rest }) => {
    const [data, setData] = useState<Array<Record<string, any>>>([
        { l: "es", maxversion: "20210620", nym: "http://kaiko.getalp.org/dbnary#antonym", count: "2827" }
    ]);
    const classes = useStyles();
    let inputLabels = [
        { key: "synonym", color: "#fdff00" },
        { key: "meronym", color: "#3ab09e" },
        { key: "hyponym", color: "#ff4f00" },
        { key: "hypernym", color: "#000080" },
        { key: "holonym", color: "#ff00ff" },
        { key: "antonym", color: "#c8c6ed" },
        { key: "approximateSynonym", color: "#777b27" }
    ];

    useEffect(() => {
        doMainCountsForAllLexicalRelations().then(normalizeSparqlData).then(setData);
    }, []);

    const result = groupBy(data, "l").map(pivot);

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
                </ResponsiveContainer>
            </Grid>
        </Grid>
    );
};

export { MainBarChart };
