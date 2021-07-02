import React, { FC } from "react";
import { MainBarChart } from "./mainBarChart";

/* istanbul ignore next: Example implementations gets deleted the most time after plugin creation! */
const Maquette: FC<{}> = () => {
    return (
        <div className="wp-styleguide">
            <MainBarChart />
        </div>
    );
};

export { Maquette };
