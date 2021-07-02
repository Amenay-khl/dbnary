import React, { Component, FC, useEffect, useState } from "react";
import { NumberOfElements } from "../numberOfElements";
import { NumberOfLexicalRelations } from "../numberOfLexicalRelations/";
import { NumberOfTranslations } from "../numberOfTranslations";
import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import Tab from "@material-tailwind/react/Tab";
import TabList from "@material-tailwind/react/TabList";
import TabItem from "@material-tailwind/react/TabItem";
import TabContent from "@material-tailwind/react/TabContent";
import TabPane from "@material-tailwind/react/TabPane";

import "@material-tailwind/react/tailwind.css";
/* The decorations to provide to the generic barchart */

const MainBarChart: FC<any> = () => {
    const [openTab, setOpenTab] = useState(1);

    return (
        <div>
            <table cellSpacing="0" cellpadding="0">
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
            </table>
        </div>
    );
};

export { MainBarChart };
