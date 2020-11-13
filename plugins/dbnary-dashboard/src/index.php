<?php
/**
 * Main file for WordPress.
 *
 * @wordpress-plugin
 * Plugin Name: 	dbnary-dashboard
 * Plugin URI:		
 * Description: 	
 * Author:          Gilles Sérasset
 * Author URI:		http://serasset.bitbucket.io/
 * Version: 		1.0.0
 * Text Domain:		dbnary-dashboard
 * Domain Path:		/languages
 */

defined('ABSPATH') or die( 'No script kiddies please!' ); // Avoid direct file request

/**
 * Plugin constants. This file is procedural coding style for initialization of
 * the plugin core and definition of plugin configuration.
 */
if (defined('DBNARY_DASHBOARD_PATH')) {
    return;
}
define('DBNARY_DASHBOARD_FILE', __FILE__);
define('DBNARY_DASHBOARD_PATH', dirname(DBNARY_DASHBOARD_FILE));
define('DBNARY_DASHBOARD_ROOT_SLUG', 'dbnary-dashboard');
define('DBNARY_DASHBOARD_SLUG', basename(DBNARY_DASHBOARD_PATH));
define('DBNARY_DASHBOARD_INC', trailingslashit(path_join(DBNARY_DASHBOARD_PATH, 'inc')));
define('DBNARY_DASHBOARD_MIN_PHP', '7.0.0'); // Minimum of PHP 5.3 required for autoloading and namespacing
define('DBNARY_DASHBOARD_MIN_WP', '5.2.0'); // Minimum of WordPress 5.0 required
define('DBNARY_DASHBOARD_NS', 'GillesSerasset\\DbnaryDashboard');
define('DBNARY_DASHBOARD_DB_PREFIX', 'dbnary_dashboard'); // The table name prefix wp_{prefix}
define('DBNARY_DASHBOARD_OPT_PREFIX', 'dbnary_dashboard'); // The option name prefix in wp_options
define('DBNARY_DASHBOARD_SLUG_CAMELCASE', lcfirst(str_replace('-', '', ucwords(DBNARY_DASHBOARD_SLUG, '-'))));
//define('DBNARY_DASHBOARD_TD', ''); This constant is defined in the core class. Use this constant in all your __() methods
//define('DBNARY_DASHBOARD_VERSION', ''); This constant is defined in the core class
//define('DBNARY_DASHBOARD_DEBUG', true); This constant should be defined in wp-config.php to enable the Base#debug() method

// Check PHP Version and print notice if minimum not reached, otherwise start the plugin core
require_once DBNARY_DASHBOARD_INC .
    'base/others/' .
    (version_compare(phpversion(), DBNARY_DASHBOARD_MIN_PHP, '>=') ? 'start.php' : 'fallback-php-version.php');
