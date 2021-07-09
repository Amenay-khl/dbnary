import React, { FC } from "react";
import { MainBarChart } from "./mainBarChart";
import { decorations } from "./styles";

/* istanbul ignore next: Example implementations gets deleted the most time after plugin creation! */
const EnhancementConfidence: FC<{}> = () => {
    return (
        <div className="wp-styleguide">
            <MainBarChart decorations={decorations} />
        </div>
    );
};

export { EnhancementConfidence };
