<?php
ini_set("log_errors", 1);
ini_set("error_log", $_SERVER['DOCUMENT_ROOT'].'/log.txt');

require 'vendor/autoload.php';

require_once 'JSONUtils.php';

$app = new \Slim\Slim();

ActiveRecord\Config::initialize(function($cfg)
 {
     $cfg->set_model_directory('models');
     $cfg->set_connections(array(
        'development' => 'mysql://finance_manager:123456@localhost/finance_manager'));
 });

 $app->get('/categories/', function () use ($app) {
     $categories = Category::all();
     echo JSONUtils::resultsToJSON($categories);
 });

 $app->run();
