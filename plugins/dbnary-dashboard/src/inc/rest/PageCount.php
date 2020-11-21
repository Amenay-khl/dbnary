<?php
namespace GillesSerasset\DbnaryDashboard\rest;

use GillesSerasset\Utils\Service;
use GillesSerasset\DbnaryDashboard\base\UtilsProvider;
use WP_REST_Response;

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
        register_rest_route($namespace, '/pagecount', [
            'methods' => 'GET',
            'callback' => [$this, 'routePageCount'],
            'permission_callback' => '__return_true'
        ]);
    }

    /**
     * See API docs.
     *
     * @api {get} /dbnary-dashboard/v1/pagecount Get page count
     * @apiHeader {string} X-WP-Nonce
     * @apiName DBnaryPageCount
     * @apiGroup PageCount
     *
     * @apiSuccessExample {json} Success-Response:
     * { "head": { "link": [], "vars": ["version", "count"] },
     * "results": { "distinct": false, "ordered": true, "bindings": [
     *   { "version": { "type": "literal", "value": "20201020" }	, "count": { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#integer", "value": "1234567" }} ] } }
     * @apiVersion 0.1.0
     */
    public function routePageCount() {
        return new WP_REST_Response(
            [
                'head' => [ 'link' => [], 'vars' => ['version', 'count'] ],
                'results' => [
                    'distinct' => false ,
                    'ordered' => true ,
                    'bindings' => [
                        [   'version' => [ 'type' => 'literal', 'value' => '20201020' ]	,
                            'count' => [ 'type' => 'typed-literal', 'datatype' => 'http://www.w3.org/2001/XMLSchema#integer', 'value' => '1234567' ]
                        ]
                    ]
                ]
            ]
        );
    }

    /**
     * New instance.
     */
    public static function instance() {
        return new PageCount();
    }
}
