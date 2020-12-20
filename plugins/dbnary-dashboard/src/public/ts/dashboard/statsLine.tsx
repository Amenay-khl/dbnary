import React, { FC, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { StatCard, MainCountStats } from "./cards/statCard";

import { SparqlResponse, doMainCountsRestCall } from "../wp-api/sparql.get";
import { DecorationSpec } from "./styles";

/* API calls */
//async function doMainCountsRestCall(): Promise<ResponseRouteMainCountsGet> {
//    return await request<RequestRouteMainCountsGet, ParamsRouteMainCountsGet, ResponseRouteMainCountsGet>({
//        location: locationRestMainCountsGet
//    });
//}

function getCountStats(response: SparqlResponse, feature: string): MainCountStats {
    if (
        response &&
        response.head &&
        response.head.vars &&
        response.head.vars.includes(feature) &&
        response.results &&
        response.results.bindings &&
        response.results.bindings.length > 0
    ) {
        const [latest, previous] = response.results.bindings;
        const count = parseInt(latest[feature].value, 10);
        const version = latest.version.value;
        let variation = 0;
        if (previous) {
            const previousCount = parseInt(previous[feature].value, 10);
            variation = ((count - previousCount) / previousCount) * 100;
        }
        return { count: count, version: version, variation: variation };
    } else {
        return { count: NaN, version: "", variation: 0 };
    }
}

const StatsLine: FC<{ decorations: Record<string, DecorationSpec> }> = ({ decorations, ...rest }) => {
    const [mainCounts, setMainCounts] = useState<SparqlResponse>(null);

    useEffect(() => {
        doMainCountsRestCall().then(setMainCounts);
    }, []);

    return (
        <Grid container item xs={12} spacing={3} justify="space-between" alignItems="center" {...rest}>
            <Grid item xs={3}>
                <StatCard decoration={decorations["page"]} stats={getCountStats(mainCounts, "pageCount")} />
            </Grid>
            <Grid item xs={3}>
                <StatCard decoration={decorations["entry"]} stats={getCountStats(mainCounts, "entryCount")} />
            </Grid>
            <Grid item xs={3}>
                <StatCard decoration={decorations["sense"]} stats={getCountStats(mainCounts, "senseCount")} />
            </Grid>
            <Grid item xs={3}>
                <StatCard
                    decoration={decorations["translation"]}
                    stats={getCountStats(mainCounts, "translationCount")}
                />
            </Grid>
        </Grid>
    );
};

export { StatsLine };
