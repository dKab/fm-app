<?php
require_once 'vendor/php-activerecord/php-activerecord/lib/Utils.php';
use \ActiveRecord\Utils as Utils;
class JSONUtils extends Utils {
  public static function resultsToJSON($resultArray) {
    $arr = array();
      if(count($resultArray)>0){
        foreach($resultArray as $row){
          array_push($arr, $row->to_array());
        }
       }
    return json_encode($arr);
  }
}
