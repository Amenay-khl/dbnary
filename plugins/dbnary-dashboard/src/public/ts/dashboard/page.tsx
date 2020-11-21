import React, { FC } from "react";
import Grid from "@material-ui/core/Grid";
import { PagesCard } from "./cards/pagesCard";

/* istanbul ignore next: Example implementations gets deleted the most time after plugin creation! */
const DbnaryDashboard: FC<{}> = () => {
    return (
        <div className="wp-styleguide">
            <Grid container item xs={12} spacing={3} justify="space-between" alignItems="center">
                <Grid item xs={3} md={4} lg={3}>
                    <PagesCard />
                </Grid>
                <Grid item xs={3} md={4} lg={3}>
                    <PagesCard />
                </Grid>
                <Grid item xs={3} md={4} lg={3}>
                    <PagesCard />
                </Grid>
                <Grid item xs={3} md={4} lg={3}>
                    <PagesCard />
                </Grid>
            </Grid>
        </div>
    );
};

export { DbnaryDashboard };
