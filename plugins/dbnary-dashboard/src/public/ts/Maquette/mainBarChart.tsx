import React, { Component, FC, useEffect, useState } from "react";
import { NumberOfElements } from "../numberOfElements";
import { NumberOfLexicalRelations } from "../numberOfLexicalRelations/";
import { NumberOfTranslations } from "../numberOfTranslations";
import { EnhancementConfidence } from "../enhancementConfidence/";
import { DecorationSpec } from "./styles";
import Grid from "@material-ui/core/Grid";

/* The decorations to provide to the generic barchart */

const MainBarChart: FC<{}> = () => {
    return (
        <Grid container item xs={12} spacing={3} justify="space-between" alignItems="center">
            <Grid item xs={4}>
                <NumberOfElements />{" "}
            </Grid>
            <Grid item xs={4}>
                <NumberOfLexicalRelations />
            </Grid>
            <Grid item xs={4}>
                <NumberOfTranslations />
            </Grid>
            <Grid item xs={4}>
                <EnhancementConfidence />
            </Grid>
            <Grid item xs={4}>
                <NumberOfElements />
            </Grid>
            <Grid item xs={4}>
                <NumberOfElements />
            </Grid>
        </Grid>
    );
};

export { MainBarChart };
