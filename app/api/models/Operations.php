<?php
class Category extends ActiveRecord\Model {

 static $belongs_to = [
    ['user', 'select'=>['id']]
  ];

 }
