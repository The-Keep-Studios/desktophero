<?php
set_include_path(dirname(__FILE__) . '/../' . PATH_SEPARATOR . get_include_path());

$CURRENT_DIR = dirname(__FILE__);
// Set default timezone
date_default_timezone_set('America/New_York');


//Register non-Slim autoloader
function customAutoLoader( $class )
{
    $file = rtrim(dirname(__FILE__), '/') . '/' . $class . '.php';
    if ( file_exists($file) ) {
        require $file;
    } else {
        return;
    }
}
spl_autoload_register('customAutoLoader');

require_once $CURRENT_DIR. '/../../' . 'autoload.php';
