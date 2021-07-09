import React, { FC } from "react";
import { MainBarChart } from "./mainBarChart";
import { decorations } from "./styles";

/* istanbul ignore next: Example implementations gets deleted the most time after plugin creation! */
const NumberOfTranslationsByLanguage = ({ langue }) => {
    return (
        <div className="wp-styleguide">
            <MainBarChart decorations={decorations} langue={langue} />
        </div>
    );
};

export { NumberOfTranslationsByLanguage };
