import React, { Component, FC, useEffect, useState } from "react";
import { NumberOfElementsForFr } from "../../numberOfElementsByLanguage/";
import { NumberOfLexicalRelationsForFr } from "../../numberOfLexicalRelationsByLanguage/";
import { NumberOfTranslationsForFr } from "../numberOfTranslationsByLanguages/";

/* The decorations to provide to the generic barchart */

const MaquetteByLanguages: FC<any> = () => {
    const [openTab, setOpenTab] = useState(1);

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
