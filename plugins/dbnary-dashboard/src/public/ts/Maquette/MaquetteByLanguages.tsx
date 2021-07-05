import React, { Component, FC, useEffect, useState } from "react";
import { NumberOfElementsForFr } from "../numberOfElementsByLanguage/numberOfElementsForFr/";
import { NumberOfLexicalRelationsForFr } from "../numberOfLexicalRelationsByLanguage/numberOfLexicalRelationsForFr/";
import { NumberOfTranslationsForFr } from "../numberOfTranslationsByLanguages/numberOfTranslationsForFr/";

/* The decorations to provide to the generic barchart */

const MaquetteByLanguages: FC<any> = () => {
    // const [openTab, setOpenTab] = useState(1);

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <NumberOfElementsForFr />
                        </td>
                        <td>
                            <NumberOfLexicalRelationsForFr />
                        </td>
                        <td>
                            <NumberOfTranslationsForFr />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export { MaquetteByLanguages };
