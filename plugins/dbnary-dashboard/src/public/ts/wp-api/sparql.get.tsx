import {
    RouteLocationInterface,
    RouteHttpVerb,
    RouteResponseInterface,
    RouteRequestInterface,
    RouteParamsInterface
} from "@dbnary-dashboard/utils";
import { version } from "fork-ts-checker-webpack-plugin";
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

const mainCountsForAllLexicalRelations =
    "SELECT ?l , ?maxversion, ?nym, ?count  \n" +
    " WHERE{\n" +
    " {\n" +
    "      # Select the latest verison \n" +
    "     SELECT distinct(?version) as ?maxversion\n" +
    "    WHERE {?s dbnary:wiktionaryDumpVersion ?version .}\n" +
    "      ORDER BY DESC (?version) LIMIT 1 \n" +
    " }\n" +
    "  ?o a qb:Observation;\n" +
    "  qb:dataSet dbnstats:dbnaryNymRelationsCube;\n" +
    "  dbnary:observationLanguage ?l;\n" +
    "  dbnary:wiktionaryDumpVersion ?maxversion;\n" +
    "  dbnary:nymRelation ?nym;\n" +
    "  dbnary:count ?count .\n" +
    " }";
"GROUP BY ?l\n" + "ORDER BY ?l";

export async function doMainCountsForAllLexicalRelations(): Promise<SparqlResponse> {
    return await request<SparqlRequest, SparqlParams, SparqlResponse>({
        location: sparqlGetLocation,
        params: {
            query: mainCountsForAllLexicalRelations
        }
    });
}

const mainCountsForAlltranslations =
    "PREFIX lemon:<http://www.w3.org/ns/lemon/lime#>\n" +
    "SELECT ?l , ?maxversion, ?Languages, ?count   WHERE{\n" +
    "   {\n" +
    "       # Select the latest verison \n" +
    "       SELECT distinct(?version) as ?maxversion \n" +
    "      WHERE {?s dbnary:wiktionaryDumpVersion ?version .}\n" +
    "      ORDER BY DESC (?version) LIMIT 1 \n" +
    "  } \n" +
    "  ?o a qb:Observation; \n" +
    "  qb:dataSet dbnstats:dbnaryTranslationsCube; \n" +
    "  dbnary:observationLanguage ?l; \n" +
    "  dbnary:wiktionaryDumpVersion ?maxversion; \n" +
    "  lemon:language ?Languages; \n" +
    "  dbnary:count ?count . \n" +
    "} \n" +
    "GROUP BY ?l\n" +
    "ORDER BY ?l";

export async function doMainCountsForAlltranslations(): Promise<SparqlResponse> {
    return await request<SparqlRequest, SparqlParams, SparqlResponse>({
        location: sparqlGetLocation,
        params: {
            query: mainCountsForAlltranslations
        }
    });
}

const numberOfElementsByLanguage = (langue) =>
    "SELECT ?Language,\n" +
    "?maxversion as ?Version,\n" +
    "?num_entries as ?Entries,\n" +
    "?num_pages as ?Vocables,\n" +
    "?num_senses as ?Senses,\n" +
    "?num_translations as ?Translations\n" +
    "WHERE\n" +
    "{\n" +
    "?obs\n" +
    "qb:dataSet dbnstats:dbnaryStatisticsCube ;\n" +
    "dbnary:observationLanguage ?Language ;\n" +
    "dbnary:lexicalEntryCount ?num_entries ;\n" +
    "dbnary:pageCount ?num_pages ;\n" +
    "dbnary:lexicalSenseCount ?num_senses ;\n" +
    "dbnary:translationsCount ?num_translations ;\n" +
    "dbnary:wiktionaryDumpVersion ?maxversion .\n" +
    "filter(?Language='" +
    langue +
    "')\n" +
    "}\n" +
    "ORDER BY ?maxversion";

export async function donumberOfElementsByLanguage(langue): Promise<SparqlResponse> {
    console.log(numberOfElementsByLanguage(langue));
    console.log(langue);

    return await request<SparqlRequest, SparqlParams, SparqlResponse>({
        location: sparqlGetLocation,
        params: {
            query: numberOfElementsByLanguage(langue)
        }
    });
}

const numberOfLexicalRelationsForFr =
    "SELECT ?l , ?maxversion, ?nym, ?count  \n" +
    "WHERE{\n" +
    "?o a qb:Observation;\n" +
    "qb:dataSet dbnstats:dbnaryNymRelationsCube;\n" +
    "dbnary:observationLanguage ?l;\n" +
    "dbnary:wiktionaryDumpVersion ?maxversion;\n" +
    "dbnary:nymRelation ?nym;\n" +
    "dbnary:count ?count .\n" +
    "filter(?l='fr')     }\n" +
    "ORDER BY ?maxversion";

export async function doNumberOfLexicalRelationsForFr(): Promise<SparqlResponse> {
    return await request<SparqlRequest, SparqlParams, SparqlResponse>({
        location: sparqlGetLocation,
        params: {
            query: numberOfLexicalRelationsForFr
        }
    });
}

const numberOftranslationsForFr =
    "PREFIX lemon:<http://www.w3.org/ns/lemon/lime#>\n" +
    "SELECT ?l , ?maxversion, ?Languages, ?count   WHERE{\n" +
    "?o a qb:Observation; \n" +
    "qb:dataSet dbnstats:dbnaryTranslationsCube; \n" +
    "dbnary:observationLanguage ?l; \n" +
    "dbnary:wiktionaryDumpVersion ?maxversion; \n" +
    "lemon:language ?Languages; \n" +
    "dbnary:count ?count . \n" +
    "filter(?l='fr').\n" +
    "} \n" +
    "ORDER BY ?maxversion";

export async function doNumberOftranslationsForFr(): Promise<SparqlResponse> {
    return await request<SparqlRequest, SparqlParams, SparqlResponse>({
        location: sparqlGetLocation,
        params: {
            query: numberOftranslationsForFr
        }
    });
}

const allLanguagesForNavBar =
    "SELECT ?Language \n" +
    "WHERE\n" +
    "{\n" +
    "    {\n" +
    "# Select the latest version\n" +
    "SELECT distinct(?version) as ?maxversion\n" +
    " WHERE { ?s dbnary:wiktionaryDumpVersion ?version . }\n" +
    "ORDER BY DESC(?version) LIMIT 1\n" +
    "}\n" +
    "?obs\n" +
    "    qb:dataSet dbnstats:dbnaryStatisticsCube ;\n" +
    "   dbnary:observationLanguage ?Language.\n" +
    "}\n" +
    "GROUP BY ?Language\n" +
    "ORDER BY ?Language";

export async function doAllLanguagesForNavBar(): Promise<SparqlResponse> {
    return await request<SparqlRequest, SparqlParams, SparqlResponse>({
        location: sparqlGetLocation,
        params: {
            query: allLanguagesForNavBar
        }
    });
}
