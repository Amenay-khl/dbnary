import { colors, Grid, makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";

export default function Navbar() {
    return (
        <div>
            <Grid container item spacing={1} justify="space-between" alignItems="center">
                <div>General</div>
                <Grid item>
                    <div>fra</div>
                </Grid>
                <Grid item>
                    <div>eng</div>
                </Grid>
                <Grid item>
                    <div>deu</div>
                </Grid>
                <Grid item>
                    <div>ell</div>
                </Grid>
                <Grid item>
                    <div>fin</div>
                </Grid>
                <Grid item>
                    <div>jpn</div>
                </Grid>
                <Grid item>
                    <div>ita</div>
                </Grid>
                <Grid item>
                    <div>por</div>
                </Grid>
                <Grid item>
                    <div>rus</div>
                </Grid>
                <Grid item>
                    <div>tur</div>
                </Grid>
            </Grid>
        </div>
    );
}
