<?php
class Operation extends ActiveRecord\Model {

 static $belongs_to = [
   ['user', 'select'=>['id']],
    ['category']
   ];
  //TODO add has_one relationship with receipt model (and add receipt model of course)
  //TODO add presence_of validation
 static public $how_to_serialize =
   [
    'include'=>
        ['category'=>
          ['only'=>
            [ 'name',
              'icon' ]
          ]
    ],
   'except'=>
      [ 'user_id',
        'category_id' ]
   ];

 static $validates_presence_of = [
  ['amount', 'message'=>"can't be empty"],
  ['category_id', 'message'=>"can't be empty"]
 ];

 static $validates_exclusion_of = [
      [
      'amount', 'in' => [0],
       'message' => "can't be zero"
      ]
    ];

 static $validates_numericality_of = [
  ['amount'],
  ['category_id', 'only_integer'=>true, 'greater_than'=>0],
  ['user_id', 'only_integer'=>true, 'greater_than'=>0]
 ];
}
