import {
    RouteLocationInterface,
    RouteHttpVerb,
    RouteResponseInterface,
    RouteRequestInterface,
    RouteParamsInterface
} from "@dbnary-dashboard/utils";

export const locationRestMainCountsGet: RouteLocationInterface = {
    path: "/maincounts",
    method: RouteHttpVerb.GET
};

export type RequestRouteMainCountsGet = RouteRequestInterface;

export type ParamsRouteMainCountsGet = RouteParamsInterface;

export interface SPARQLTypedValue {
    type: string;
    datatype: string;
    value: string;
}

export interface ResponseRouteMainCountsGet extends RouteResponseInterface {
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

export const ResponseRouteMainCountsGet_empty: ResponseRouteMainCountsGet = {
    head: {
        link: [],
        vars: []
    },
    results: {
        distinct: false,
        ordered: false,
        bindings: [{}]
    }
};
