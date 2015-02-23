<?php
use ActiveRecord\Model;
class User extends ActiveRecord\Model {

   static $has_many = [
        ['categories', 'class_name'=>'Category']
    ];

    static $validates_presence_of = [
          ['name', 'message'=>'User should have a name'],
          ['email', 'message'=>'User should have an email'],
          ['password', 'message'=>'User should have a password']
      ];
    static $validates_size_of = [
        ['password', 'minimum' => 6, 'message'=>'is too short']
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
