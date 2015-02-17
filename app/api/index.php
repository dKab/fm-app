<?php
ini_set("log_errors", 1);
ini_set("error_log", $_SERVER['DOCUMENT_ROOT'].'/log.txt');

require 'vendor/autoload.php';
require_once 'JSONUtils.php';

$app = new \Slim\Slim();
$app->jwtKey ='3ewv2%eyufq!ib=-0@kdz194#a5t)3rtu!=a=)7sx=_-=6^q)r';

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
        $token = [
            "iss" => "fm-app",//TODO change to actual url
            "iat" => time(),
            "exp" => time() + (4 * 7 * 24 * 60 * 60), // lifetime of this jwt is four weeks
            'sub' => $user->email,
            'user' => $user->name
        ];
        $jwt = JWT::encode($token, $app->jwtKey);
        $responseBody['token'] = $jwt;
        $responseBody['status'] = 'success';
        $responseBody['message'] = "Welcome aboard, {$user->name}!";
     } else {
         $responseBody['status'] = 'error';
         $responseBody['message'] = $user->errors->errors();
     }
     echoJSON(200, $responseBody);
  });

  $app->post('/login', function () use ($app) {
    $responseBody = [];
    $req = json_decode($app->request->getBody());
    $user = User::find_by_email($req->email);
    if ($user != null) {
      $passwordMatch = password_verify($req->password, $user->password);
      if ($passwordMatch) {
          $token = [
            "iss" => "fm-app",//TODO change to actual url
            "iat" => time(),
            "exp" => time() + (4 * 7 * 24 * 60 * 60), // lifetime of this jwt is four weeks
            'sub' => $user->email,
            'user' => $user->name
          ];
          $jwt = JWT::encode($token, $app->jwtKey);
          $responseBody['token'] = $jwt;
          $responseBody['message'] = "Nice to see you come back, {$user->name}";
          $responseBody['status'] = 'success';
          echoJSON(200, $responseBody);
      }
    }
    if ($user == null || (isset($passwordMatch) && !$passwordMatch)) {
        $responseBody['message'] = "Email or password doesn't match";
        $responseBody['status'] = 'error';
        echoJSON(401, $responseBody);
    }
  }

 $app->get('/categories', function () use ($app) { //TODO add middleware that verifies token
     $categories = Category::all();
     echo JSONUtils::ARresultsToJSON($categories);
 });

function echoJSON($status_code, $responseBody) {
     $app = \Slim\Slim::getInstance();
     $app->response->setStatus($status_code);
     $app->response->headers->set('Content-Type', 'application/json');
     echo json_encode($responseBody);
 }

 $app->run();
