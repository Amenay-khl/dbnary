<?php
namespace GillesSerasset\DbnaryDashboard\view\numberOfElements;
use GillesSerasset\DbnaryDashboard\base\UtilsProvider;
use WP_Widget;

// @codeCoverageIgnoreStart
defined('ABSPATH') or die('No script kiddies please!'); // Avoid direct file request
// @codeCoverageIgnoreEnd

/**
 * Simple widget that creates an HTML element with React rendering.
 *
 * @codeCoverageIgnore Example implementations gets deleted the most time after plugin creation!
 */
class NumberOfElements {
    use UtilsProvider;
 
    const COMPONENT_ID = DBNARY_DASHBOARD_SLUG . '-numberOfElements'; // attribute ID

    /**
     * C'tor.
     */
    public function __construct() {
        // nop
    }

    /**
     * Output the sortcode content.
     *
     * @param mixed $args
     * @param array $instance
     */
    public function shortcode($args, $instance) {
        return '<div id="' . self::COMPONENT_ID . '" class="wrap"></div>';
    }

 
    /**
     * New instance.
     */
    public static function instance() {
        return new NumberOfElements();
    }
}
