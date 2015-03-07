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



 }
