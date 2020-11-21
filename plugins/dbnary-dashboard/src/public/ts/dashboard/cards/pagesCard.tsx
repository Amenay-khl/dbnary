import { FC, useState, useEffect } from "react";
import { request } from "../../utils";
import clsx from "clsx";
import {
    RequestRoutePageCountGet,
    ParamsRoutePageCountGet,
    ResponseRoutePageCountGet,
    locationRestPageCountGet
} from "../../wp-api/pagecount.get";
import { Avatar, Box, Card, CardContent, CardHeader, Typography, colors, makeStyles } from "@material-ui/core";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

interface PageCountStats {
    count: number;
    version: string;
    variation: number;
}

async function doPageCountRestCall(): Promise<PageCountStats> {
    const result = await request<RequestRoutePageCountGet, ParamsRoutePageCountGet, ResponseRoutePageCountGet>({
        location: locationRestPageCountGet
    });
    // alert(`${JSON.stringify(result, undefined, 4)}`);
    const count: number = parseInt(result.results.bindings[0].count.value, 10);
    const version: string = result.results.bindings[0].version.value;
    // alert(count);
    return { count: count, version: version, variation: 0 };
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%"
    },
    avatar: {
        backgroundColor: colors.red[600],
        height: 38,
        width: 38
    },
    differenceIcon: {
        color: colors.red[900]
    },
    differenceValue: {
        color: colors.red[900],
        marginRight: theme.spacing(1)
    }
}));

/* istanbul ignore next: Example implementations gets deleted the most time after plugin creation! */
const PagesCard: FC<{}> = ({ ...rest }) => {
    const classes = useStyles();
    const [pageCount, setPageCount] = useState(NaN);
    const [version, setVersion] = useState("Unknow dump version");

    useEffect(() => {
        doPageCountRestCall().then((stats: PageCountStats) => {
            setPageCount(stats.count);
            setVersion(stats.version);
        });
    }, []);
    const value: string = isNaN(pageCount) ? "--" : pageCount.toLocaleString(undefined);

    return (
        <Card className={clsx(classes.root)} {...rest}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        <MenuBookRoundedIcon />
                    </Avatar>
                }
                title="Pages"
                subheader={`Dump: ${version}`}
            />
            <CardContent>
                <Typography color="textPrimary" variant="h4">
                    {value}
                </Typography>
                <Box mt={2} display="flex" alignItems="center">
                    <ArrowDownwardIcon className={classes.differenceIcon} />
                    <Typography className={classes.differenceValue} variant="body2">
                        12%
                    </Typography>
                    <Typography color="textSecondary" variant="caption">
                        since last extract
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export { PagesCard };
