<?php



/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/reorganizar', array('as' => 'reorganizar','uses'=>'HomeController@reorganizar'));


Route::get('/generatemenu', array('as' => 'generatemenu','uses'=>'HomeController@generatemenu'));
Route::get('/menucreator', array('as' => 'menucreator','uses'=>'HomeController@menucreator'));
Route::get('/menu', array('as' => 'menu','uses'=>'HomeController@menu'));
Route::get('/widgetcreator', array('as' => 'widgetcreator','uses'=>'HomeController@widgetcreator'));
Route::post('/getwidgetinformation', array('as' => 'getwidgetinformation','uses'=>'HomeController@getwidgetinformation'));
Route::get('/deletewidget', array('as' => 'deletewidget','uses'=>'HomeController@deletewidget'));
Route::get('/menupreview' , 'HomeController@menupreview');
Route::get('/getallmenus', array('as' => 'getallmenus','uses'=>'HomeController@getallmenus'));
Route::get('/deletemenu', array('as' => 'deletemenu','uses'=>'HomeController@deletemenu'));
Route::post('/menupost', array('as' => 'menupost','uses'=>'HomeController@menupost'));
Route::post('/updatemenus', array('as' => 'updatemenus','uses'=>'HomeController@updatemenus'));
Route::post('/createmenu', array('as' => 'createmenu','uses'=>'HomeController@createmenu'));
Route::post('/createwidget', array('as' => 'createwidget','uses'=>'HomeController@createwidget'));
Route::post('/menudeletepost', array('as' => 'menudeletepost','uses'=>'HomeController@menudeletepost'));




//version dos

Route::get('/menuw', array('as' => 'menuw','uses'=>'HomeController@menuw'));

Route::post('/addcustommenu', array('as' => 'addcustommenu','uses'=>'HomeController@addcustommenu'));
Route::post('/deleteitemmenu', array('as' => 'deleteitemmenu','uses'=>'HomeController@deleteitemmenu'));
Route::post('/deletemenug', array('as' => 'deletemenug','uses'=>'HomeController@deletemenug'));
Route::post('/createnewmenu', array('as' => 'createnewmenu','uses'=>'HomeController@createnewmenu'));



Route::post('/generatemenucontrol', array('as' => 'generatemenucontrol','uses'=>'HomeController@generatemenucontrol'));
Route::post('/updateitem', array('as' => 'updateitem','uses'=>'HomeController@updateitem'));

