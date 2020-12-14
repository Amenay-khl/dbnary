import { Grid } from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { doMainCountsForAllLanguages, SparqlResponse, TypedValue } from "../wp-api/sparql.get";

function valueAsString(val: TypedValue): string {
    return val.value;
}
function valueAsInt(val: TypedValue): number {
    return parseInt(val.value);
}

type MainBarChartProps = "Language" | "Version" | "Entries" | "Vocables" | "Translations" | "Senses";

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
    return result;
}

const MainBarChart: FC<{}> = () => {
    const [data, setData] = useState<Array<Record<string, any>>>(null);

    useEffect(() => {
        doMainCountsForAllLanguages().then(normalizeSparqlData).then(setData);
    }, []);

    return (
        <Grid container item xs={12} spacing={3} justify="space-between" alignItems="center">
            <Grid item xs={6} lg={4}>
                <ResponsiveContainer>
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Language" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Vocables" stackId="a" fill="#82ca9d" />
                        <Bar dataKey="Entries" stackId="a" fill="#8884d8" />
                        <Bar dataKey="Senses" stackId="a" fill="#82ca9d" />
                        <Bar dataKey="Translations" stackId="a" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </Grid>
        </Grid>
    );
};

export { MainBarChart };
