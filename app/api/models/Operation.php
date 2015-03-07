<?php
class Operation extends ActiveRecord\Model {

 static $belongs_to = [
    ['user', 'select'=>['id']],
    ['category']
  ];
  //TODO add has_one relationship with receipt model (and add receipt model of course)
  //TODO add presence_of validation
 }
