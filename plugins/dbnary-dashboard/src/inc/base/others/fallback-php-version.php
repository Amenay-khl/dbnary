<?php
defined('ABSPATH') or die('No script kiddies please!'); // Avoid direct file request

if (!function_exists('dbnary_dashboard_skip_php_admin_notice')) {
    /**
     * Show an admin notice to administrators when the minimum PHP version
     * could not be reached. The error message is only in english available.
     */
    function dbnary_dashboard_skip_php_admin_notice() {
        if (current_user_can('install_plugins')) {
            $data = get_plugin_data(DBNARY_DASHBOARD_FILE, true, false);
            echo '<div class=\'notice notice-error\'>
				<p><strong>' .
                $data['Name'] .
                '</strong> could not be initialized because you need minimum PHP version ' .
                DBNARY_DASHBOARD_MIN_PHP .
                ' ... you are running: ' .
                phpversion() .
                '.
			</div>';
        }
    }
}
add_action('admin_notices', 'dbnary_dashboard_skip_php_admin_notice');
