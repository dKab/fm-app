<?php
require_once 'vendor/php-activerecord/php-activerecord/lib/Utils.php';
require_once 'vendor/slim/slim/Slim/Slim.php';
use \ActiveRecord\Utils as Utils;
use \Slim\Slim;

class JSONUtils extends Utils {

  public static function ARresultsToJSON($resultArray) {
    $arr = array();
      if(count($resultArray)>0){
        foreach($resultArray as $row){
          array_push($arr, $row->to_array());
        }
       }
    return json_encode($arr);
  }

  public static function sendJSON($status_code, $responseBody=[]) {
       $app = \Slim\Slim::getInstance();
       $app->response->setStatus($status_code);
       $app->response->headers->set('Content-Type', 'application/json');
       echo json_encode($responseBody);
   }

}
