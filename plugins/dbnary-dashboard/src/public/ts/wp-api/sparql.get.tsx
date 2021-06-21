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

export async function domainCountsForAllLexicalRelations(): Promise<SparqlResponse> {
    return await request<SparqlRequest, SparqlParams, SparqlResponse>({
        location: sparqlGetLocation,
        params: {
            query: mainCountsForAllLexicalRelations
        }
    });
}

// select ?lg, ?nbHomonyms where {
//     {
//         select ?lg, count(distinct ?page) as ?nbHomonyms where {
//             ?page dbnary:describes ?le .
//             ?le dct:language ?lg .
//             { SELECT distinct ?page , ?partOfSpeech where {
//                 ?page dbnary:describes ?le1 ; dbnary:describes ?le2 .
//                 ?le1 lexinfo:partOfSpeech ?partOfSpeech.
//                 ?le2 lexinfo:partOfSpeech ?partOfSpeech.
//                 FILTER (?le1 != ?le2)
//                 }
//             }
//         } group by ?lg
//     }
// }
// group by ?lg

// SELECT ?Language

// count(distinct ?num_syn) as ?syn

// WHERE
// {

// ?obs
// dct:language ?Language ;
// dbnary:synonym ?num_syn .

// }
// GROUP BY ?Language
// ORDER BY ?Language

// "SELECT ?Language\n" +
//     "    (sample(?maxversion) as ?Version)\n" +
//     "    (sample(?num_syn) as ?syn)\n" +
//     "    (sample(?num_qsyn) as ?qsyn)\n" +
//     "    (sample(?num_ant) as ?ant)\n" +
//     "    (sample(?num_hyper) as ?hyper)\n" +
//     "    (sample(?num_hypo) as ?hypo)\n" +
//     "    (sample(?num_mero) as ?mero)\n" +
//     "    (sample(?num_holo) as ?holo)\n" +
//     "    (sample(?num_tropo) as ?tropo)\n" +
//     "WHERE\n" +
//     "{\n" +
//     "    {\n" +
//     "     # Select the latest version\n" +
//     "     SELECT distinct(?version) as ?maxversion\n" +
//     "     WHERE { ?s dbnary:wiktionaryDumpVersion ?version . }\n" +
//     "     ORDER BY DESC(?version) LIMIT 1\n" +
//     "}\n" +
//     "?obs\n" +
//     "    qb:dataSet dbnstats:dbnaryStatisticsCube ;\n" +
//     "    dbnary:observationLanguage ?Language ;\n" +
//     "    dbnary:synonym ?num_syn ;\n" +
//     "    dbnary:approximateSynonym ?num_qsyn ;\n" +
//     "    dbnary:antonym ?num_ant ;\n" +
//     "    dbnary:hypernym ?num_hyper ;\n" +
//     "    dbnary:hyponym ?num_hypo ;\n" +
//     "    dbnary:meronym ?num_mero ;\n" +
//     "    dbnary:holonym ?num_holo ;\n" +
//     "    dbnary:troponym ?num_tropo ;\n" +
//     "    dbnary:wiktionaryDumpVersion ?maxversion .\n" +
//     "}\n" +
//     "GROUP BY ?Language\n" +
//     "ORDER BY ?Language";
