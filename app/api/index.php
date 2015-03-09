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
         JSONUtils::sendError(400, $errors);
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

    $app->get('/operations/:id', function() { AuthHelper::checkAuthorized(); }, function($id) use ($app) {

    });

    $app->get('/operations/', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {
      $operations = Operation::all(['joins'=>['user']], ['conditions'=>['user_id = ?', $app->userId], 'order' => 'date desc']);
      $data = JSONUtils::ARCollectionToArray($operations, Operation::$how_to_serialize);
      JSONUtils::sendJSON(200, $data);
    });

    $app->post('/operations/', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {
        $req = json_decode($app->request->getBody(), $assoc = true);
        $req['user_id'] = $app->userId;
        $op = Operation::create($req);
        if ($op->is_valid()) {
          $headers =  ['Location'=>"http:://{$_SERVER['HTTP_HOST']}/api/operations/{$op->id}"];
          JSONUtils::sendJSON(201, $op->to_array(Operation::$how_to_serialize), $headers);
         } else {
          $errors = $op->errors->to_array();
          JSONUtils::sendError(422, $errors);
         }
     });

     $app->delete('/operations/:id', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


     });

     $app->put('/operations/:id', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


     });


     $app->post('/categories', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {
        $req = json_decode($app->request->getBody(), $assoc = true);
        $req['user_id'] = $app->userId;
        $cat = Category::create($req);
        if ($cat->is_valid()) {
          $headers = ['Location'=>"http://{$_SERVER['HTTP_HOST']}/api/categories/{$cat->id}"];
          JSONUtils::sendJSON(201, $cat->to_array(Category::$how_to_serialize), $headers);
        } else {
           $errors = $cat->errors->to_array();
           JSONUtils::sendError(422, $errors);
        }
     });

     $app->delete('/categories', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


     });

     $app->put('/categories/:id', function() { AuthHelper::checkAuthorized(); }, function() use ($app) {


     });

      $app->get('/categories/:id', function() { AuthHelper::checkAuthorized(); }, function($id) use ($app) {
        try {
          $category = Category::find($id);

        } catch(RecordNotFound $e) {
            $app->response->status(404);
        } catch(Exception $e) {
            $app->response->status(400);
            $app->response()->header('X-Status-Reason', $e->getMessage());
        }
      });

    $app->get('/categories/', function() { AuthHelper::checkAuthorized(); } , function () use ($app) {
      $categories = Category::all(['joins'=>['user']], ['conditions'=>['user_id = ?', $app->userId]]);
      $data = JSONUtils::ARCollectionToArray($categories);
      JSONUtils::sendJSON(200, $data);//TODO add pagination
    });


 $app->run();
