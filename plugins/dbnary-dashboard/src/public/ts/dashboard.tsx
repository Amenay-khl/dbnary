/* istanbul ignore file: we do not need to care about the entry point file as errors are detected through E2E */

/**
 * The entrypoint for the WordPress dashboard as a shortcode.
 */

import "@dbnary-dashboard/utils"; // Import once for startup polyfilling (e. g. setimmediate)
import { render } from "react-dom";
import { DbnaryDashboard } from "./dashboard/";
import { RootStore } from "./store";
import { NumberOfElements } from "./numberOfElements/";
import { NumberOfLexicalRelations } from "./numberOfLexicalRelations/";
import { NumberOfTranslations } from "./numberOfTranslations/";
import { NumberOfElementsForFr } from "./numberOfElementsByLanguage/numberOfElementsForFr/";
import { NumberOfLexicalRelationsForFr } from "./numberOfLexicalRelationsByLanguage/numberOfLexicalRelationsForFr/";
// Query DOM for the shortcod div (we assume the shortcode is used only once in a page).
const node = document.getElementById(`${RootStore.get.optionStore.slug}-dashboard`);
const node2 = document.getElementById(`${RootStore.get.optionStore.slug}-numberOfElements`);
const node3 = document.getElementById(`${RootStore.get.optionStore.slug}-numberOfLexicalRelations`);
const node4 = document.getElementById(`${RootStore.get.optionStore.slug}-numberOfTranslations`);
const node5 = document.getElementById(`${RootStore.get.optionStore.slug}-numberOfElementsForFr`);
const node6 = document.getElementById(`${RootStore.get.optionStore.slug}-numberOfLexicalRelationsForFr`);

// Iterate over the DOM nodes and render a React component into each node
if (node) {
    render(
        <RootStore.StoreProvider>
            <DbnaryDashboard />
        </RootStore.StoreProvider>,
        node
    );
}
if (node2) {
    render(
        <RootStore.StoreProvider>
            <NumberOfElements />
        </RootStore.StoreProvider>,
        node2
    );
}

if (node3) {
    render(
        <RootStore.StoreProvider>
            <NumberOfLexicalRelations />
        </RootStore.StoreProvider>,
        node3
    );
}

if (node4) {
    render(
        <RootStore.StoreProvider>
            <NumberOfTranslations />
        </RootStore.StoreProvider>,
        node4
    );
}

if (node5) {
    render(
        <RootStore.StoreProvider>
            <NumberOfElementsForFr />
        </RootStore.StoreProvider>,
        node5
    );
}

if (node6) {
    render(
        <RootStore.StoreProvider>
            <NumberOfLexicalRelationsForFr />
        </RootStore.StoreProvider>,
        node6
    );
}
