import {
    RouteLocationInterface,
    RouteHttpVerb,
    RouteResponseInterface,
    RouteRequestInterface,
    RouteParamsInterface
} from "@dbnary-dashboard/utils";

export const locationRestPageCountGet: RouteLocationInterface = {
    path: "/pagecount",
    method: RouteHttpVerb.GET
};

export type RequestRoutePageCountGet = RouteRequestInterface;

export type ParamsRoutePageCountGet = RouteParamsInterface;

export interface SPARQLTypedValue {
    type: string;
    datatype: string;
    value: string;
}

export interface ResponseRoutePageCountGet extends RouteResponseInterface {
    head: {
        link: Array<unknown>;
        vars: Array<string>;
    };
    results: {
        distinct: boolean;
        ordered: boolean;
        bindings: Array<Record<string, SPARQLTypedValue>>;
    };
}
