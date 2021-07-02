import React, { Component, FC, useEffect, useState } from "react";
import { NumberOfElements } from "../numberOfElements";
import { NumberOfLexicalRelations } from "../numberOfLexicalRelations/";
import { NumberOfTranslations } from "../numberOfTranslations";

import "@material-tailwind/react/tailwind.css";
/* The decorations to provide to the generic barchart */

const MainBarChart: FC<any> = () => {
    const [openTab, setOpenTab] = useState(1);

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <NumberOfElements />
                        </td>
                        <td>
                            <NumberOfLexicalRelations />
                        </td>
                        <td>
                            <NumberOfTranslations />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <NumberOfElements />
                        </td>
                        <td>
                            <NumberOfElements />
                        </td>
                        <td>
                            <NumberOfElements />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export { MainBarChart };
