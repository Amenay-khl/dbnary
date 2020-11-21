/* istanbul ignore file: we do not need to care about the entry point file as errors are detected through E2E */

/**
 * The entrypoint for the WordPress dashboard as a shortcode.
 */

import "@dbnary-dashboard/utils"; // Import once for startup polyfilling (e. g. setimmediate)
import { render } from "react-dom";
import { DbnaryDashboard } from "./dashboard/";
import "./style/widget.scss";

// Query DOM for all widget wrapper divs
const shortcodes = document.querySelectorAll("div.dbnary-dashboard-shortcode");

// Iterate over the DOM nodes and render a React component into each node
shortcodes.forEach((item) => render(<DbnaryDashboard />, item));
