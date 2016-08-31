<?php
/**
 * This is a bootstrap file for getting the ball rolling.
 */
error_reporting(E_ALL);
ini_set('display_errors','on');
/**
 * Step 1: Require the autoloader
 *
 * Using composer, composer provides an autoloader
 * that will load the classes from the vendor directory
 * @link http://www.php-fig.org/psr/psr-4/
 */
require_once '../vendor/autoload.php';
require_once('../lib/app.php');
