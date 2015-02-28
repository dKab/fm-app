<?php
require_once 'vendor/slim/slim/Slim/Slim.php';
require_once 'vendor/firebase/php-jwt/Firebase/PHP-JWT/Authentication/JWT.php';

class AuthHelper {

  public static function checkAuthorized() {
   $valid = false;
   $app = \Slim\Slim::getInstance();
   $token = $app->request->headers->get('Authorization');
   if ($token) {
     $token = JWT::decode($token, $app->jwtKey);
     if ($token->exp > time() &&  $token->iss == $app->name)
        $valid = true;
        //make userid accessable in the controller
        $app->userId = $token->sub;
   }
   if (!$valid)
    $app->halt(403);
  }

  public static function generateToken($id) {
      $app = \Slim\Slim::getInstance();
      $token = [
      "iss" => $app->name,
      "iat" => time(),
      "exp" => time() + (4 * 7 * 24 * 60 * 60), // lifetime of this jwt is four weeks
      'sub' => $id
      ];
      $jwt = JWT::encode($token, $app->jwtKey);
      return $jwt;
   }
}
