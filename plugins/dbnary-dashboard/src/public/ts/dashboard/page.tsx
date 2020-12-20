import React, { FC } from "react";
import { MainBarChart } from "./mainBarChart";
import { StatsLine } from "./statsLine";
import { decorations } from "./styles";

/* istanbul ignore next: Example implementations gets deleted the most time after plugin creation! */
const DbnaryDashboard: FC<{}> = () => {
    return (
        <div className="wp-styleguide">
            <StatsLine decorations={decorations} />
            <MainBarChart decorations={decorations} />
        </div>
    );
};

export { DbnaryDashboard };
