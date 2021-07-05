import React, { Component, FC, useEffect, useState } from "react";
import { NumberOfElementsForFr } from "../numberOfElementsByLanguage/numberOfElementsForFr/";
import { NumberOfLexicalRelationsForFr } from "../numberOfLexicalRelationsByLanguage/numberOfLexicalRelationsForFr/";
import { NumberOfTranslationsForFr } from "../numberOfTranslationsByLanguages/numberOfTranslationsForFr/";

import Grid from "@material-ui/core/Grid";

import { DecorationSpec } from "./styles";

/* The decorations to provide to the generic barchart */

const MaquetteByLanguages: FC<any> = () => {
    // const [openTab, setOpenTab] = useState(1);

    return (
        <Grid container item xs={12} spacing={3} justify="space-between" alignItems="center" {...rest}>
            <Grid item xs={4}>
                <NumberOfElementsForFr />{" "}
            </Grid>
            <Grid item xs={4}>
                <NumberOfLexicalRelationsForFr />
            </Grid>
            <Grid item xs={4}>
                <NumberOfTranslationsForFr />
            </Grid>
        </Grid>
    );
};

export { MaquetteByLanguages };
