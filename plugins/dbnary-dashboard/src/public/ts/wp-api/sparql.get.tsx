import {
    RouteLocationInterface,
    RouteHttpVerb,
    RouteResponseInterface,
    RouteRequestInterface,
    RouteParamsInterface
} from "@dbnary-dashboard/utils";
import { request } from "../utils";

export const sparqlGetLocation: RouteLocationInterface = {
    path: "/sparql",
    method: RouteHttpVerb.GET
};

export type SparqlRequest = RouteRequestInterface;

export type SparqlParams = RouteParamsInterface & { query: string };

export interface TypedValue {
    type: string;
    datatype: string;
    value: string;
}

export interface SparqlResponse extends RouteResponseInterface {
    head: {
        link: Array<unknown>;
        vars: Array<string>;
    };
    results: {
        distinct: boolean;
        ordered: boolean;
        bindings: Array<Record<string, TypedValue>>;
    };
}

const mainCountsSparqlQuery =
    "select  ?latestversions as ?version, \n" +
    "sum(?pages) as ?pageCount,\n" +
    "sum(?translations) as ?translationCount,\n" +
    "sum(?lexicalSenses) as ?senseCount,\n" +
    "sum(?lexicalEntries) as ?entryCount\n" +
    "where {\n" +
    "    {\n" +
    "     # Select the 2 latest versions\n" +
    "     SELECT distinct(?version) as ?latestversions\n" +
    "     WHERE { ?s dbnary:wiktionaryDumpVersion ?version . }\n" +
    "     ORDER BY DESC(?version) LIMIT 2\n" +
    "    }" +
    "    ?obs qb:dataSet dbnstats:dbnaryStatisticsCube ;\n" +
    "        dbnary:wiktionaryDumpVersion ?latestversions ;\n" +
    "        dbnary:pageCount ?pages;\n" +
    "        dbnary:translationsCount ?translations;\n" +
    "        dbnary:lexicalSenseCount ?lexicalSenses;\n" +
    "        dbnary:lexicalEntryCount ?lexicalEntries.\n" +
    " }\n" +
    "GROUP BY ?latestversions\n" +
    "ORDER BY desc(?latestversions)";

export async function doMainCountsRestCall(): Promise<SparqlResponse> {
    return await request<SparqlRequest, SparqlParams, SparqlResponse>({
        location: sparqlGetLocation,
        params: {
            query: mainCountsSparqlQuery
        }
    });
}

const mainCountsForAllLanguages =
    "SELECT ?Language\n" +
    "    (sample(?maxversion) as ?Version)\n" +
    "    (sample(?num_entries) as ?Entries)\n" +
    "    (sample(?num_pages) as ?Vocables)\n" +
    "    (sample(?num_senses) as ?Senses)\n" +
    "    (sample(?num_translations) as ?Translations)\n" +
    "WHERE\n" +
    "{\n" +
    "    {\n" +
    "     # Select the latest version\n" +
    "     SELECT distinct(?version) as ?maxversion\n" +
    "     WHERE { ?s dbnary:wiktionaryDumpVersion ?version . }\n" +
    "     ORDER BY DESC(?version) LIMIT 1\n" +
    "}\n" +
    "?obs\n" +
    "    qb:dataSet dbnstats:dbnaryStatisticsCube ;\n" +
    "    dbnary:observationLanguage ?Language ;\n" +
    "    dbnary:lexicalEntryCount ?num_entries ;\n" +
    "    dbnary:pageCount ?num_pages ;\n" +
    "    dbnary:lexicalSenseCount ?num_senses ;\n" +
    "    dbnary:translationsCount ?num_translations ;\n" +
    "    dbnary:wiktionaryDumpVersion ?maxversion .\n" +
    "}\n" +
    "GROUP BY ?Language\n" +
    "ORDER BY ?Language";

export async function doMainCountsForAllLanguages(): Promise<SparqlResponse> {
    return await request<SparqlRequest, SparqlParams, SparqlResponse>({
        location: sparqlGetLocation,
        params: {
            query: mainCountsForAllLanguages
        }
    });
}
