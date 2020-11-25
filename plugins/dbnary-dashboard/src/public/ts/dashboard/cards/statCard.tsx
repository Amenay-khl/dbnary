import { FC } from "react";
import clsx from "clsx";
import { Avatar, Box, Card, CardContent, CardHeader, Typography, colors, makeStyles } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

interface MainCountStats {
    count: number;
    version: string;
    variation: number;
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%"
    },
    avatar: (props: { avatarColor: string }) => ({
        backgroundColor: props.avatarColor,
        height: 38,
        width: 38
    }),
    positiveDifferenceIcon: {
        color: colors.green[900]
    },
    negativeDifferenceIcon: {
        color: colors.red[900]
    },
    positiveDifferenceValue: {
        color: colors.green[900],
        marginRight: theme.spacing(1)
    },
    negativeDifferenceValue: {
        color: colors.red[900],
        marginRight: theme.spacing(1)
    },
    smallPadding: {
        padding: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        "&:last-child": {
            paddingBottom: theme.spacing(1)
        }
    },
    greyBackground: {
        backgroundColor: colors.grey[100]
    }
}));

interface decorationSpec {
    avatarColor: string;
    avatarIcon: JSX.Element;
    title: string;
}

/* istanbul ignore next: Example implementations gets deleted the most time after plugin creation! */
const StatCard: FC<{ stats: MainCountStats; decoration: decorationSpec }> = ({ stats, decoration, ...rest }) => {
    const classes = useStyles(decoration);

    const value: string = isNaN(stats.count) ? "--" : stats.count.toLocaleString(undefined);
    const version: string = isNaN(stats.count) ? "--" : stats.version;
    const decrease = isNaN(stats.count) ? false : stats.variation < 0;
    const variation: string = isNaN(stats.count) ? "--" : `${stats.variation.toFixed(2)}%`;
    const differenceIcon = decrease ? (
        <ArrowDownwardIcon className={classes.negativeDifferenceIcon} />
    ) : (
        <ArrowUpwardIcon className={classes.positiveDifferenceIcon} />
    );
    const differenceValueClassname = decrease ? classes.negativeDifferenceValue : classes.positiveDifferenceValue;
    const { avatarIcon, title } = decoration;

    return (
        <Card className={clsx(classes.root)} {...rest}>
            <CardHeader
                className={clsx(classes.smallPadding, classes.greyBackground)}
                avatar={<Avatar className={classes.avatar}>{avatarIcon}</Avatar>}
                title={title}
                subheader={`Dump: ${version}`}
            />
            <CardContent className={classes.smallPadding}>
                <Typography color="textPrimary" variant="h5">
                    {value}
                </Typography>
                <Box mt={2} display="flex" alignItems="center" marginTop="">
                    {differenceIcon}
                    <Typography className={differenceValueClassname} variant="body2">
                        {variation}
                    </Typography>
                    <Typography color="textSecondary" variant="caption">
                        since last extract
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export { StatCard, MainCountStats, decorationSpec };
