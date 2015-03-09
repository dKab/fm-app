<?php
class Category extends ActiveRecord\Model {

 static $belongs_to = [
    ['user', 'select'=>['id']]
  ];

  static $has_many = [
     ['operations']
  ];

  static $validates_presence_of = [
    ['name','message'=>"can't be empty"]
  ];

 static public $how_to_serialize  = [
  'except'=>
    ['user_id']
  ];

  static $validates_numericality_of = [
    [ 'user_id', 'only_integer'=>true, 'greater_than'=>0 ]
   ];

  static $validates_uniqueness_of = [
  [
      ['name', 'user_id'],
      'message'=> 'should be unique'
      ]
  ];

 }
