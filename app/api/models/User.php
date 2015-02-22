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
    static validates_size_of = [
        ['password', 'minimum' => 6, 'message'=>'password is too short']
    ];
    static $validates_format_of = [
      ['email', 'with' =>
         '/^[^0-9][A-z0-9_]+([.][A-z0-9_]+)*[@][A-z0-9_]+([.][A-z0-9_]+)*[.][A-z]{2,4}$/']
      //TODO add password strength validation here
    ];

    static $validates_uniqueness_of = array[
        ['email', 'message' => 'User with the provided email already exists!']
    ]
}
