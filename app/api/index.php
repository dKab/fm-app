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
     $req = json_decode($app->request->getBody(), $assoc = true);
     $user = User::create($req);
     if ($user->is_valid()) {
        $user->password = password_hash($user->password, PASSWORD_DEFAULT);
        $user->save();
        $response = [
          'token' => AuthHelper::generateToken($user->id)
        ];
        $headers = ['Location'=>"/user/{$user->id}"];
        JSONUtils::sendJSON(201, $response, $headers);
     } else {
         $errors = $user->errors->to_array();
         JSONUtils::sendError(422, $errors);
     }
  });

  $app->post('/login', function () use ($app) {
    $req = json_decode($app->request->getBody());
    $user = User::find_by_email($req->email);
    if ($user !== null && password_verify($req->password, $user->password) ) {
          $response =[
            'token' => AuthHelper::generateToken($user->id)
          ];
          JSONUtils::sendJSON(200, $response);
    } else {
        $errors =['Bad credentials' => 'Invalid Email or password'];
        JSONUtils::sendError(401, $errors);
    }
  });

    $app->get('/operation/:id', function() { AuthHelper::checkAuthorized(); }, function($id) use ($app) {

    });

    $app->get('/operation/', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


    });

    $app->post('/operation', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


     });

     $app->delete('/operation', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


     });

     $app->put('/operation', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


     });


     $app->post('/category', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {
        $req = json_decode($app->request->getBody(), $assoc = true);
        $req['user_id'] = $app->userId;
        $cat = Category::create($req);
        file_put_contents('$_SERVER["DOCUMENT_ROOT"]/1.txt', print_r($_SERVER, true)); //TODO remove this line
        if ($cat->is_valid()) {
          $headers = ['Location'=>"/category/{$cat->id}"];
          JSONUtils::sendJSON(201, $cat->to_array(), $headers);
        } else {
           $errors = $user->errors->to_array();
           JSONUtils::sendError(422, $errors);
        }
     });

     $app->delete('/category', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


     });

     $app->put('/category', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


     });

      $app->get('/category/:id', function() { AuthHelper::checkAuthorized(); }, function($id) use ($app) {
       $category = Category::find($id);


       //JSONUtils::sendJSON(

      });

    $app->get('/category/', function() { AuthHelper::checkAuthorized(); } , function () use ($app) {
      $categories = Category::all(['joins'=>['user']], ['conditions'=>['user_id = ?', $app->userId]]);
      $data = JSONUtils::ARCollectionToArray($categories);
      $JSONUtils::sendJSON(200, $data);
    });


 $app->run();
