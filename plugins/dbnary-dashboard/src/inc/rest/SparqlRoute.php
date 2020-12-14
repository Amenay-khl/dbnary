<?php
namespace GillesSerasset\DbnaryDashboard\rest;

use GillesSerasset\Utils\Service;
use GillesSerasset\DbnaryDashboard\base\UtilsProvider;
use WP_REST_Response, WP_Error, WP_REST_Request;

// @codeCoverageIgnoreStart
defined('ABSPATH') or die('No script kiddies please!'); // Avoid direct file request
// @codeCoverageIgnoreEnd

/**
 * Create an REST Service to get the main stats by language from DBnary.
 */
class SparqlRoute {
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
        register_rest_route($namespace, '/sparql', [
            'methods' => 'GET',
            'callback' => [$this, 'routeSparql'],
            'permission_callback' => '__return_true'
        ]);
    }

    private const MAIN_STATS_SPARQL_QUERY = 'SELECT ?Language
        (sample(?maxversion) as ?Version)
        (sample(?num_entries) as ?Entries)
        (sample(?num_pages) as ?Vocables)
        (sample(?num_senses) as ?Senses)
        (sample(?num_translations) as ?Translations)
    WHERE
    {
        {
         # Select the latest version
         SELECT distinct(?version) as ?maxversion
         WHERE { ?s dbnary:wiktionaryDumpVersion ?version . }
         ORDER BY DESC(?version) LIMIT 1
        }

        ?obs
            qb:dataSet dbnstats:dbnaryStatisticsCube ;
            dbnary:observationLanguage ?Language ;
            dbnary:lexicalEntryCount ?num_entries ;
            dbnary:pageCount ?num_pages ;
            dbnary:lexicalSenseCount ?num_senses ;
            dbnary:translationsCount ?num_translations ;
            dbnary:wiktionaryDumpVersion ?maxversion .
    } GROUP BY ?Language
ORDER BY ?Language';

    /**
     * See API docs.
     *
     * @api {get} /dbnary-dashboard/v1/mainstats Get page count
     * @apiHeader {string} X-WP-Nonce
     * @apiName DBnaryPageCount
     * @apiGroup MainStats
     *
     * @apiSuccessExample {csv} Success-Response:
     * { "head": { "link": [], "vars": ["version", "pageCount", "translationCount", "senseCount", "entryCount"] },
     *   "results": { "distinct": false, "ordered": true, "bindings": [
     *       { "version": { "type": "literal", "value": "20201020" }	, "pageCount": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "5883121" }	, "translationCount": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "7568230" }	, "senseCount": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "4219322" }	, "entryCount": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "5812121" }},
     *       { "version": { "type": "literal", "value": "20201001" }	, "pageCount": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "5874729" }	, "translationCount": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "7539825" }	, "senseCount": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "4210694" }	, "entryCount": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "5803345" }} ] } }
     * @apiVersion 0.1.0
     */
    public function routeSparql(WP_REST_Request $request) {
        // first we get the query parameters from the request
        $params = $request->get_query_params();
        if (!isset($params['query'])) {
            error_log('No Query Parameter to Sparql Proxy');
            return new WP_Error('data', __('No Query Parameter to Sparql Proxy'), ['status' => 404]);
        }
        error_log('query=' . $params['query']);

        $params['default-graph-uri'] = '';
        $params['format'] = 'application/sparql-results+json';
        $params['timeout'] = 0;
        // convert the params to a string
        $query = http_build_query($params);
        error_log("http://kaiko.getalp.org/sparql?$query");
        // build the URL using the endpoint and any params and make a remote GET request
        $request = wp_remote_get("http://kaiko.getalp.org/sparql?$query");
        // Retrieve information
        $response_code = wp_remote_retrieve_response_code($request);
        $response_message = wp_remote_retrieve_response_message($request);
        $response_body = wp_remote_retrieve_body($request);
        error_log($response_code);
        error_log($response_message);
        error_log($response_body);

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
        return new SparqlRoute();
    }
}
