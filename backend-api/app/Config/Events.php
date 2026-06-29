<?php

namespace Config;

use CodeIgniter\Events\Events;
use CodeIgniter\Exceptions\FrameworkException;
use CodeIgniter\HotReloader\HotReloader;

/*
 * --------------------------------------------------------------------
 * Application Events
 * --------------------------------------------------------------------
 */

Events::on('pre_system', static function (): void {

    if (ENVIRONMENT !== 'testing') {

        $value = ini_get('zlib.output_compression');

        if (filter_var($value, FILTER_VALIDATE_BOOLEAN) || (int) $value > 0) {
            throw FrameworkException::forEnabledZlibOutputCompression();
        }

        while (ob_get_level() > 0) {
            ob_end_flush();
        }

        ob_start(static fn ($buffer) => $buffer);
    }

    /*
     * =====================================================
     * CORS
     * =====================================================
     */

    if (!is_cli()) {

        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }

    /*
     * --------------------------------------------------------------------
     * Debug Toolbar Listeners
     * --------------------------------------------------------------------
     */

    if (CI_DEBUG && !is_cli()) {

        Events::on(
            'DBQuery',
            'CodeIgniter\Debug\Toolbar\Collectors\Database::collect'
        );

        service('toolbar')->respond();

        if (ENVIRONMENT === 'development') {

            service('routes')->get('__hot-reload', static function (): void {
                (new HotReloader())->run();
            });

        }
    }

});