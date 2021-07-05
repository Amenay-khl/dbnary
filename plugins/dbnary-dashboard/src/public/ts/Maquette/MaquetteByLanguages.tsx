import React, { Component, FC, useEffect, useState } from "react";
import { NumberOfElementsForFr } from "../numberOfElementsByLanguage/numberOfElementsForFr/";
import { NumberOfLexicalRelationsForFr } from "../numberOfLexicalRelationsByLanguage/numberOfLexicalRelationsForFr/";
import { NumberOfTranslationsForFr } from "../numberOfTranslationsByLanguages/numberOfTranslationsForFr/";

import Grid from "@material-ui/core/Grid";
import { StatCard, MainCountStats } from "./cards/statCard";

import { SparqlResponse, doMainCountsRestCall } from "../wp-api/sparql.get";
import { DecorationSpec } from "./styles";
import { colors, makeStyles } from "@material-ui/core";

/* The decorations to provide to the generic barchart */

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%"
    },
    avatar: (props: DecorationSpec) => ({
        backgroundColor: props.color,
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

const MaquetteByLanguages: FC<{ decorations: Record<string, DecorationSpec> }> = ({ decorations, ...rest }) => {
    // const [openTab, setOpenTab] = useState(1);

    return (
        // <div>
        //     <table>
        //         <tbody>
        //             <tr>
        //                 <td>
        //                     <NumberOfElementsForFr />
        //                 </td>
        //                 <td>
        //                     <NumberOfLexicalRelationsForFr />
        //                 </td>
        //                 <td>
        //                     <NumberOfTranslationsForFr />
        //                 </td>
        //             </tr>
        //         </tbody>
        //     </table>
        // </div>

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
