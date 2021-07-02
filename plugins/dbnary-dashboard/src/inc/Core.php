<?php
namespace GillesSerasset\DbnaryDashboard;
use GillesSerasset\DbnaryDashboard\base\Core as BaseCore;
use GillesSerasset\DbnaryDashboard\rest\HelloWorld;
use GillesSerasset\DbnaryDashboard\rest\SparqlRoute;
use GillesSerasset\DbnaryDashboard\view\menu\Page;
use GillesSerasset\DbnaryDashboard\view\dashboard\Dashboard;
use GillesSerasset\DbnaryDashboard\view\widget\Widget;
use GillesSerasset\DbnaryDashboard\view\numberOfElements\NumberOfElements;
use GillesSerasset\DbnaryDashboard\view\numberOfLexicalRelations\NumberOfLexicalRelations;
use  GillesSerasset\DbnaryDashboard\view\numberOfTranslations\NumberOfTranslations;
use  GillesSerasset\DbnaryDashboard\view\numberOfElementsByLanguage\numberOfElementsForFr\NumberOfElementsForFr;
use GillesSerasset\DbnaryDashboard\view\numberOfLexicalRelationsByLanguage\numberOfLexicalRelationsForFr\NumberOfLexicalRelationsForFr;
use GillesSerasset\DbnaryDashboard\view\numberOfTranslationsByLanguages\numberOfTranslationsForFr\NumberOfTranslationsForFr;
use GillesSerasset\DbnaryDashboard\view\Maquette\Maquette;
// @codeCoverageIgnoreStart
defined('ABSPATH') or die('No script kiddies please!'); // Avoid direct file request
// @codeCoverageIgnoreEnd

/**
 * Singleton core class which handles the main system for plugin. It includes
 * registering of the autoload, all hooks (actions & filters) (see BaseCore class).
 */
class Core extends BaseCore {
    /**
     * Singleton instance.
     */
    private static $me;

    /**
     * Application core constructor.
     */
    protected function __construct() {
        parent::__construct();

        // Register all your before init hooks here
        add_action('widgets_init', [$this, 'widgets_init']);
    }

    /**
     * The init function is fired even the init hook of WordPress. If possible
     * it should register all hooks to have them in one place.
     */
    public function init() {
        // Register all your hooks here
        add_action('rest_api_init', [HelloWorld::instance(), 'rest_api_init']);
        add_action('rest_api_init', [SparqlRoute::instance(), 'rest_api_init']);
        add_action('admin_enqueue_scripts', [$this->getAssets(), 'admin_enqueue_scripts']);
        add_action('wp_enqueue_scripts', [$this->getAssets(), 'wp_enqueue_scripts']);
        add_action('admin_menu', [Page::instance(), 'admin_menu']);
        add_shortcode('dbdashboard', [Dashboard::instance(), 'shortcode']);
        add_shortcode('nbOfElements', [NumberOfElements::instance(), 'shortcode']);
        add_shortcode('nbOfLexicalRelation', [NumberOfLexicalRelations::instance(), 'shortcode']);
        add_shortcode('nbOfTranslations', [NumberOfTranslations::instance(), 'shortcode']);
        add_shortcode('nbOfElementsForFr', [NumberOfElementsForFr::instance(), 'shortcode']);
        add_shortcode('nbOfLexicalRelationForFr', [NumberOfLexicalRelationsForFr::instance(), 'shortcode']);
        add_shortcode('nbOfTranslationsForFr', [NumberOfTranslationsForFr::instance(), 'shortcode']);
        add_shortcode('Maquette', [Maquette::instance(), 'shortcode']);
    }

    /**
     * Register widgets.
     *
     * @codeCoverageIgnore Example implementations gets deleted the most time after plugin creation!
     */
    public function widgets_init() {
        register_widget(Widget::class);
    }

    /**
     * Get singleton core class.
     *
     * @return Core
     */
    public static function getInstance() {
        return !isset(self::$me) ? (self::$me = new Core()) : self::$me;
    }
}

// Inherited from packages/utils/src/Service
/**
 * See API docs.
 *
 * @api {get} /dbnary-dashboard/v1/plugin Get plugin information
 * @apiHeader {string} X-WP-Nonce
 * @apiName GetPlugin
 * @apiGroup Plugin
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     Name: "My plugin",
 *     PluginURI: "https://example.com/my-plugin",
 *     Version: "0.1.0",
 *     Description: "This plugin is doing something.",
 *     Author: "<a href="https://example.com">John Smith</a>",
 *     AuthorURI: "https://example.com",
 *     TextDomain: "my-plugin",
 *     DomainPath: "/languages",
 *     Network: false,
 *     Title: "<a href="https://example.com">My plugin</a>",
 *     AuthorName: "John Smith"
 * }
 * @apiVersion 0.1.0
 */
