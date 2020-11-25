import React, { FC, useEffect, useState } from "react";
import { request } from "../utils";
import { colors } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { StatCard, MainCountStats, DecorationSpec } from "./cards/statCard";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import TranslateRoundedIcon from "@material-ui/icons/TranslateRounded";
import ListRoundedIcon from "@material-ui/icons/ListRounded";
import EmojiObjectsRoundedIcon from "@material-ui/icons/EmojiObjectsRounded";
import {
    RequestRouteMainCountsGet,
    ParamsRouteMainCountsGet,
    ResponseRouteMainCountsGet,
    locationRestMainCountsGet,
    ResponseRouteMainCountsGet_empty
} from "../wp-api/maincounts.get";

/* API calls */
async function doMainCountsRestCall(): Promise<ResponseRouteMainCountsGet> {
    return await request<RequestRouteMainCountsGet, ParamsRouteMainCountsGet, ResponseRouteMainCountsGet>({
        location: locationRestMainCountsGet
    });
}

function getCountStats(response: ResponseRouteMainCountsGet, feature: string): MainCountStats {
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

/* Decorations for cards */

const decorations: Record<string, DecorationSpec> = {
    page: { avatarColor: colors.red[600], avatarIcon: <MenuBookRoundedIcon />, title: "Pages" },
    entry: { avatarColor: colors.blue[600], avatarIcon: <ListRoundedIcon />, title: "Entries" },
    sense: { avatarColor: colors.green[600], avatarIcon: <EmojiObjectsRoundedIcon />, title: "Lexical Senses" },
    translation: { avatarColor: colors.yellow[600], avatarIcon: <TranslateRoundedIcon />, title: "Translations" }
};

const StatsLine: FC<{}> = () => {
    const [mainCounts, setMainCounts] = useState(ResponseRouteMainCountsGet_empty);

    useEffect(() => {
        doMainCountsRestCall().then(setMainCounts);
    }, []);

    return (
        <Grid container item xs={12} spacing={3} justify="space-between" alignItems="center">
            <Grid item xs={3} md={4} lg={3}>
                <StatCard decoration={decorations["page"]} stats={getCountStats(mainCounts, "pageCount")} />
            </Grid>
            <Grid item xs={3} md={4} lg={3}>
                <StatCard decoration={decorations["entry"]} stats={getCountStats(mainCounts, "entryCount")} />
            </Grid>
            <Grid item xs={3} md={4} lg={3}>
                <StatCard decoration={decorations["sense"]} stats={getCountStats(mainCounts, "senseCount")} />
            </Grid>
            <Grid item xs={3} md={4} lg={3}>
                <StatCard
                    decoration={decorations["translation"]}
                    stats={getCountStats(mainCounts, "translationCount")}
                />
            </Grid>
        </Grid>
    );
};

export { StatsLine };
