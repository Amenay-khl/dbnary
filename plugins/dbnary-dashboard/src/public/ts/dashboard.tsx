/* istanbul ignore file: we do not need to care about the entry point file as errors are detected through E2E */

/**
 * The entrypoint for the WordPress dashboard as a shortcode.
 */

import "@dbnary-dashboard/utils"; // Import once for startup polyfilling (e. g. setimmediate)
import { render } from "react-dom";
import { DbnaryDashboard } from "./dashboard/";
import { RootStore } from "./store";
import { NumberOfElements } from "./numberOfElements/";

// Query DOM for the shortcod div (we assume the shortcode is used only once in a page).
const node = document.getElementById(`${RootStore.get.optionStore.slug}-dashboard`);
const node2 = document.getElementById(`${RootStore.get.optionStore.slug}-numberOfElements`);

let nodes;
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
