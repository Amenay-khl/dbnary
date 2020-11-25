import React, { FC } from "react";
import { StatsLine } from "./statsLine";

/* istanbul ignore next: Example implementations gets deleted the most time after plugin creation! */
const DbnaryDashboard: FC<{}> = () => {
    return (
        <div className="wp-styleguide">
            <StatsLine />
        </div>
    );
};

export { DbnaryDashboard };
