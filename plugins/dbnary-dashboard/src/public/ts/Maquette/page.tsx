import React, { FC } from "react";
import { MainBarChart } from "./mainBarChart";
import { StatsLine } from "../dashboard/statsLine";
import { decorations } from "./styles";
import Navbar from "./navbar";

/* istanbul ignore next: Example implementations gets deleted the most time after plugin creation! */
const Maquette: FC<{}> = () => {
    return (
        <div className="wp-styleguide">
            <Navbar />
        </div>
    );
};

export { Maquette };
