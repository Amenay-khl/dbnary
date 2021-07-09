import React, { Component, FC, useEffect, useState } from "react";
import { NumberOfElementsByLanguage } from "../numberOfElementsByLanguage/numberOfElementsForFr";
import { NumberOfLexicalRelationsByLanguage } from "../numberOfLexicalRelationsByLanguage/numberOfLexicalRelationsForFr/";
import { NumberOfTranslationsByLanguage } from "../numberOfTranslationsByLanguages/numberOfTranslationsForFr/";

import Grid from "@material-ui/core/Grid";

import { DecorationSpec } from "./styles";

/* The decorations to provide to the generic barchart */

const MaquetteByLanguages = ({ langue }) => {
    return (
        <Grid container item xs={12} spacing={3} justify="space-between" alignItems="center">
            <Grid item xs={4}>
                <NumberOfElementsByLanguage langue={langue} />
            </Grid>
            <Grid item xs={4}>
                <NumberOfLexicalRelationsByLanguage langue={langue} />
            </Grid>
            <Grid item xs={4}>
                <NumberOfTranslationsByLanguage langue={langue} />
            </Grid>
        </Grid>
    );
};

export { MaquetteByLanguages };
