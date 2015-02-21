<?php
use ActiveRecord\Model;
class Category extends ActiveRecord\Model {

 static $belongs_to = [
    ['user']
  ];


 }
