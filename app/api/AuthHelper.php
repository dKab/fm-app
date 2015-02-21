<?php
require_once 'vendor/slim/slim/Slim/Slim.php';
require_once 'vendor/firebase/php-jwt/Firebase/PHP-JWT/Authentication/JWT.php';

use \Slim\Slim;
use JWT;

class AuthHelper {

  public static function checkAuthorized() {
   $valid = false;
   $app = \Slim\Slim::getInstance();
   $req = json_decode($app->request->getBody(), $assoc = true);
   if ( isset($req['token']) ) {
     $token = JWT::decode($req['token'], $app->jwtKey);
     if ($token->exp() > time() &&  $token->iss == $app->name)
        $valid = true;
   }
   if (!$valid)
    $app->halt(403);
  }

  public static function getEmail() {
     $app = \Slim\Slim::getInstance();
     $req = json_decode($app->request->getBody(), $assoc = true);
     if ( isset($req['token']) ) {
        $token = JWT::decode($req['token'], $app->jwtKey);
        return $token->sub;
     } else return null;
  }

  public static function generateToken($email, $name) {
      $app = \Slim\Slim::getInstance();
      $token = [
      "iss" => $app->name,
      "iat" => time(),
      "exp" => time() + (4 * 7 * 24 * 60 * 60), // lifetime of this jwt is four weeks
      'sub' => $email
      'user' => $name ];
      $jwt = JWT::encode($token, $app->jwtKey);
      return $jwt;
   }
}
