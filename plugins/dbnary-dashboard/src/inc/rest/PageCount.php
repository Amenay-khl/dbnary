<?php
namespace GillesSerasset\DbnaryDashboard\rest;

use GillesSerasset\Utils\Service;
use GillesSerasset\DbnaryDashboard\base\UtilsProvider;
use WP_REST_Response, WP_Error;

// @codeCoverageIgnoreStart
defined('ABSPATH') or die('No script kiddies please!'); // Avoid direct file request
// @codeCoverageIgnoreEnd

/**
 * Create an REST Service to get the total DBnary page count.
 */
class PageCount {
    use UtilsProvider;

    /**
     * C'tor.
     */
    private function __construct() {
        // Silence is golden.
    }

    /**
     * Register endpoints.
     */
    public function rest_api_init() {
        $namespace = Service::getNamespace($this);
        register_rest_route($namespace, '/maincounts', [
            'methods' => 'GET',
            'callback' => [$this, 'routePageCount'],
            'permission_callback' => '__return_true'
        ]);
    }

    private const TOTAL_COUNTS_SPARQL_QUERY = 'select  ?latestversions as ?version, 
    sum(?pages) as ?pageCount,
    sum(?translations) as ?translationCount,
    sum(?lexicalSenses) as ?senseCount,
    sum(?lexicalEntries) as ?entryCount
    where {
        {
         # Select the 2 latest versions
         SELECT distinct(?version) as ?latestversions
         WHERE { ?s dbnary:wiktionaryDumpVersion ?version . }
         ORDER BY DESC(?version) LIMIT 2
        }

        ?obs qb:dataSet dbnstats:dbnaryStatisticsCube ;
            dbnary:wiktionaryDumpVersion ?latestversions ;
            dbnary:pageCount ?pages;
            dbnary:translationsCount ?translations;
            dbnary:lexicalSenseCount ?lexicalSenses;
            dbnary:lexicalEntryCount ?lexicalEntries.
     }
GROUP BY ?latestversions
ORDER BY desc(?latestversions)';

    /**
     * See API docs.
     *
     * @api {get} /dbnary-dashboard/v1/pagecount Get page count
     * @apiHeader {string} X-WP-Nonce
     * @apiName DBnaryPageCount
     * @apiGroup PageCount
     *
     * @apiSuccessExample {json} Success-Response:
     * { "head": { "link": [], "vars": ["version", "pageCount", "translationCount", "senseCount", "entryCount"] },
     *   "results": { "distinct": false, "ordered": true, "bindings": [
     *       { "version": { "type": "literal", "value": "20201020" }	, "pageCount": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "5883121" }	, "translationCount": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "7568230" }	, "senseCount": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "4219322" }	, "entryCount": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "5812121" }},
     *       { "version": { "type": "literal", "value": "20201001" }	, "pageCount": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "5874729" }	, "translationCount": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "7539825" }	, "senseCount": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "4210694" }	, "entryCount": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "5803345" }} ] } }
     * @apiVersion 0.1.0
     */
    public function routePageCount() {
        // first we get the query parameters from the request
        $params = [];
        $params['query'] = $this::TOTAL_COUNTS_SPARQL_QUERY;
        $params['default-graph-uri'] = '';
        $params['format'] = 'application/sparql-results+json';
        $params['timeout'] = 0;
        // convert the params to a string
        $query = http_build_query($params);
        // build the URL using the endpoint and any params and make a remote GET request
        $request = wp_remote_get("http://kaiko.getalp.org/sparql?$query");
        // Retrieve information
        $response_code = wp_remote_retrieve_response_code($request);
        $response_message = wp_remote_retrieve_response_message($request);
        $response_body = wp_remote_retrieve_body($request);

        if (!is_wp_error($request) ) {
            return new WP_REST_Response(json_decode($response_body));
        } else {
            return new WP_Error($response_code, $response_message, $response_body);
        }
    }

    /**
     * New instance.
     */
    public static function instance() {
        return new PageCount();
    }
}
