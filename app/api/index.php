<?php
ini_set("log_errors", 1);
ini_set("error_log", $_SERVER['DOCUMENT_ROOT'].'/log.txt');

require 'vendor/autoload.php';
require_once 'JSONUtils.php';

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
        //add new User to database and provide token with his credentials
        $responseBody['token'] = AuthHelper::generateToken($user->email, $user->name);
        $responseBody['status'] = 'success';
     } else {
         $responseBody['status'] = 'error';
         $responseBody['errors'] = $user->errors->errors();
     }
      echoJSON(200, $responseBody);
  });

  $app->post('/login', function () use ($app) {
    $responseBody = [];
    $req = json_decode($app->request->getBody());
    $user = User::find_by_email($req->email);
    if ($user !== null && password_verify($req->password, $user->password) ) {
          $responseBody['token'] = AuthHelper::generateToken($user->email, $user->name);
          echoJSON(200, $responseBody);
    } else {
        $responseBody['status'] = 'error';
        echoJSON(401, $responseBody);
    }
  }

 $app->get('/categories', AuthHelper::checkAuthorized, function () use ($app) {
     $email = AuthHelper::getEmail();
     $categories = Category::all(); //TODO find only categories which belong to the user
     echo JSONUtils::ARresultsToJSON($categories);
 });





 $app->run();
