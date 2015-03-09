<?php
require_once 'vendor/php-activerecord/php-activerecord/lib/Utils.php';
require_once 'vendor/slim/slim/Slim/Slim.php';
use \ActiveRecord\Utils as Utils;

class JSONUtils extends Utils {

  public static function ARCollectionToArray($resultArray, $options = []) {
    $arr =[];
      if(count($resultArray)>0){
        foreach($resultArray as $row)
          $arr[] = $row->to_array($options);
       }
    return $arr;
  }

  public static function sendError($status_code, Array $errors, Array $headers = []) {
    $app = \Slim\Slim::getInstance();
    $app->response->setStatus($status_code);
    foreach ($headers as $key=>$value) $app->response->headers->set($key, $value);
    $app->response->headers->set('Content-Type', 'application/json');
    $responseBody = ['errors' => $errors];
    echo json_encode($responseBody);
  }

  public static function sendJSON($status_code, Array $data, Array $headers = []) {
       $app = \Slim\Slim::getInstance();
       $app->response->setStatus($status_code);
       foreach ($headers as $key => $value )
          $app->response->headers->set($key, $value);
       $app->response->headers->set('Content-Type', 'application/json');
       echo json_encode($data);
   }

}
