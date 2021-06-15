import { colors, Grid, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { Component, FC, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { doMainCountsForAllLanguages, SparqlResponse, TypedValue } from "../wp-api/sparql.get";
import { DecorationSpec } from "./styles";
import { format as d3Format } from "d3-format";
import { getEnglishName } from "../utils/iso636_1";
import * as css from "./style.css";

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
    Pages: valueAsInt,
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
    const [isTranslations, setIsTranslations] = useState(true);
    const [isSenses, setIsSenses] = useState(true);
    const [isEntries, setIsEntries] = useState(true);
    const [isVocables, setIsVocables] = useState(true);
    const classes = useStyles();

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
            <Grid>
                <div className="css-checkbox">
                    <label>
                        <input
                            type="checkbox"
                            checked={isTranslations}
                            style={{ width: 20, height: 20 }}
                            onClick={() => setIsTranslations(!isTranslations)}
                        />
                        <span>Translations</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={isSenses}
                            style={{ width: 20, height: 20 }}
                            onClick={() => setIsSenses(!isSenses)}
                        />
                        <span>Senses</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={isEntries}
                            style={{ width: 20, height: 20 }}
                            onClick={() => setIsEntries(!isEntries)}
                        />
                        <span>Entries</span>
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={isVocables}
                            style={{ width: 20, height: 20 }}
                            onClick={() => setIsVocables(!isVocables)}
                        />
                        <span>Vocables</span>
                    </label>
                </div>
            </Grid>
            <Grid item xs={12} xl={6}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Language" tick={<XAxisLanguageTick />} />
                        <YAxis type="number" tick={<YAxisNumberTick />} />
                        <Tooltip labelFormatter={langNameFormatter} />
                        <Legend />
                        {isVocables ? <Bar dataKey="Vocables" stackId="a" fill={decorations["page"].color} /> : ""}
                        {isEntries ? <Bar dataKey="Entries" stackId="a" fill={decorations["entry"].color} /> : ""}
                        {isSenses ? <Bar dataKey="Senses" stackId="a" fill={decorations["sense"].color} /> : ""}
                        {isTranslations ? (
                            <Bar dataKey="Translations" stackId="a" fill={decorations["translation"].color} />
                        ) : (
                            ""
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </Grid>
        </Grid>
    );
};

export { MainBarChart };
