<?php
ini_set("log_errors", 1);
ini_set("error_log", $_SERVER['DOCUMENT_ROOT'].'/log.txt');

require 'vendor/autoload.php';
require_once 'JSONUtils.php';
require_once 'AuthHelper.php';

$app = new \Slim\Slim();
$app->jwtKey ='3ewv2%eyufq!ib=-0@kdz194#a5t)3rtu!=a=)7sx=_-=6^q)r';
$app->name = 'fm-app';

ActiveRecord\Config::initialize(function($cfg)
 {
     $cfg->set_model_directory('models');
     $cfg->set_connections([
        'development' => 'mysql://finance_manager:123456@localhost/finance_manager']);
 });

  $app->post('/signup', function () use ($app) {
     $responseBody = [];
     $req = json_decode($app->request->getBody(), $assoc = true);
     $user = User::create($req);
     if ($user->is_valid()) {
        $user->password = password_hash($user->password, PASSWORD_DEFAULT);
        $user->save();
        //add new User to database and provide him with token
        $responseBody['token'] = AuthHelper::generateToken($user->id);
        $responseBody['name'] = $user->name;
        $responseBody['id'] = $user->id;
        JSONUtils::sendJSON(201, $responseBody);
     } else {
         $responseBody['errors'] = $user->errors->to_array();
         JSONUtils::sendJSON(422, $responseBody);
     }
  });

  $app->post('/login', function () use ($app) {
    $responseBody = [];
    $req = json_decode($app->request->getBody());
    $user = User::find_by_email($req->email);
    if ($user !== null && password_verify($req->password, $user->password) ) {
          $responseBody['token'] = AuthHelper::generateToken($user->id);
          $responseBody['name'] = $user->name;
          $responseBody['id'] = $user->id;
          JSONUtils::sendJSON(200, $responseBody);
    } else {
        $responseBody['error'] = 'Invalid Email or password';
        JSONUtils::sendJSON(401, $responseBody);
    }
  });

    $app->get('/operation', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


    });


    $app->post('/operation', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


     });

     $app->delete('/operation', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


     });

     $app->put('/operation', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


     });


     $app->post('/category', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


     });

     $app->delete('/category', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


     });

     $app->put('/category', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


     });

 $app->get('/categories/', function() { AuthHelper::checkAuthorized(); } , function () use ($app) {
     $categories = Category::all(['joins'=>['user']], ['conditions'=>['user_id = ?', $app->userId]]);
     echo JSONUtils::ARresultsToJSON($categories);
 });





 $app->run();
