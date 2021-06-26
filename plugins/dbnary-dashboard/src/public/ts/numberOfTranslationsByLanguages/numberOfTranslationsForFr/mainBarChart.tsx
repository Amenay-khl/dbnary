import { colors, Grid, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { Component, FC, useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import {
    doMainCountsForAllLexicalRelations,
    doNumberOfLexicalRelationsForFr,
    doNumberOftranslationsForFr,
    SparqlResponse,
    TypedValue
} from "../../wp-api/sparql.get";
import { DecorationSpec } from "./styles";
import { format as d3Format } from "d3-format";
import { getEnglishName } from "../../utils/iso636_1";

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
        { l: "bg", maxversion: "20210620", Languages: "it", count: "1202" }
    ]);
    const classes = useStyles();

    useEffect(() => {
        doNumberOftranslationsForFr().then(normalizeSparqlData).then(setData);
    }, []);

    const result = groupBy(data, "maxversion").map(pivot);
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
                    <AreaChart
                        width={500}
                        height={200}
                        data={result}
                        syncId="anyId"
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="" tick={<XAxisLanguageTick />} />
                        <YAxis type="number" tick={<YAxisNumberTick />} />
                        <Tooltip labelFormatter={langNameFormatter} />
                        <Legend />

                        <Area type="monotone" dataKey="de" stackId="1" fill="#7B241C" stroke="#7B241C" />
                        <Area type="monotone" dataKey="el" stackId="1" fill="#ff4f00 " stroke="#ff4f00" />
                        <Area type="monotone" dataKey="en" stackId="1" fill="#C39BD3" stroke="#C39BD3" />
                        <Area type="monotone" dataKey="fi" stackId="1" fill="#5B2C6F " stroke="#5B2C6F" />
                        <Area type="monotone" dataKey="fr" stackId="1" fill="#2471A3" stroke="#2471A3" />
                        <Area type="monotone" dataKey="it" stackId="1" fill="#85C1E9" stroke="#85C1E9" />
                        <Area type="monotone" dataKey="id" stackId="1" fill="#48C9B0" stroke="#48C9B0" />
                        <Area type="monotone" dataKey="ja" stackId="1" fill="#229954" stroke="#229954" />
                        <Area type="monotone" dataKey="mul" stackId="1" fill="#F9E79F" stroke="#F9E79F" />
                        <Area
                            type="monotone"
                            dataKey="number_of_languages:"
                            stackId="1"
                            fill="#B3B6B7"
                            stroke="#B3B6B7"
                        />
                        <Area type="monotone" dataKey="others:" stackId="1" fill="#F39C12" stroke="#F39C12" />
                        <Area type="monotone" dataKey="pt" stackId="1" fill="#fdff00" stroke="#fdff00" />
                        <Area type="monotone" dataKey="ru" stackId="1" fill="#34495E " stroke="#34495E" />
                        <Area type="monotone" dataKey="tr" stackId="1" fill="#ff00ff" stroke="#ff00ff" />
                    </AreaChart>
                </ResponsiveContainer>
            </Grid>
        </Grid>
    );
};

export { MainBarChart };
