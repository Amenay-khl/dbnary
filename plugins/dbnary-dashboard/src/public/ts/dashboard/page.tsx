import React, { FC } from "react";
import { MainBarChart } from "./mainBarChart";
import { StatsLine } from "./statsLine";
import { decorations } from "./styles";
import { doMainCountsForAllLanguages } from "../wp-api/sparql.get";

/* istanbul ignore next: Example implementations gets deleted the most time after plugin creation! */
const DbnaryDashboard: FC<{}> = () => {
    return (
        <div className="wp-styleguide">
            <StatsLine decorations={decorations} />
            <MainBarChart decorations={decorations} provider={doMainCountsForAllLanguages} />
        </div>
    );
};

export { DbnaryDashboard };
