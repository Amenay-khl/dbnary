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
import { NumberOfElementsByLanguage } from "./numberOfElementsByLanguage/numberOfElementsForFr/";
import { NumberOfLexicalRelationsByLanguage } from "./numberOfLexicalRelationsByLanguage/numberOfLexicalRelationsForFr/";
import { NumberOfTranslationsByLanguage } from "./numberOfTranslationsByLanguages/numberOfTranslationsForFr/";
import { Maquette } from "./Maquette/";
// Query DOM for the shortcod div (we assume the shortcode is used only once in a page).
const node = document.getElementById(`${RootStore.get.optionStore.slug}-dashboard`);
const node2 = document.getElementById(`${RootStore.get.optionStore.slug}-numberOfElements`);
const node3 = document.getElementById(`${RootStore.get.optionStore.slug}-numberOfLexicalRelations`);
const node4 = document.getElementById(`${RootStore.get.optionStore.slug}-numberOfTranslations`);
const node5 = document.getElementById(`${RootStore.get.optionStore.slug}-numberOfElementsForFr`);
const node6 = document.getElementById(`${RootStore.get.optionStore.slug}-numberOfLexicalRelationsForFr`);
const node7 = document.getElementById(`${RootStore.get.optionStore.slug}-numberOfTranslationsForFr`);
const node8 = document.getElementById(`${RootStore.get.optionStore.slug}-maquette`);

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
            <NumberOfElementsByLanguage langue="fr" />
        </RootStore.StoreProvider>,
        node5
    );
}

if (node6) {
    render(
        <RootStore.StoreProvider>
            <NumberOfLexicalRelationsByLanguage langue="fr" />
        </RootStore.StoreProvider>,
        node6
    );
}

if (node7) {
    render(
        <RootStore.StoreProvider>
            <NumberOfTranslationsByLanguage langue="fr" />
        </RootStore.StoreProvider>,
        node7
    );
}
if (node8) {
    render(
        <RootStore.StoreProvider>
            <Maquette />
        </RootStore.StoreProvider>,
        node8
    );
}
