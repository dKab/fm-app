<?php
use ActiveRecord\Model;
class User extends ActiveRecord\Model {

   static $has_many = [
        ['categories', 'class_name'=>'Category']
    ];

    static $validates_presence_of = [
          ['name', 'message'=>"can't be empty"],
          ['email', 'message'=>"can't be empty"],
          ['password', 'message'=>"can't be empty"]
      ];
    static $validates_size_of = [
        ['password', 'minimum' => 6, 'message'=>'is too short'],
        ['name', 'minimum'=>3, 'message'=>'is too short']
    ];
//    static $validates_format_of = [
//      ['email', 'with' =>
//         "/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/"]
//      //TODO add password strength validation here
//    ];

    static $validates_uniqueness_of = [
        ['email', 'message' => 'is occupied!']
    ];
}
