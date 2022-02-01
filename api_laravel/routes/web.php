<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route to get all comics
Route::get('/getAllComics/{offset}', 'App\Http\Controllers\GetComicsController@getAllComics');
// Route to get comic by id
Route::get('/getComicById/{comicId}', 'App\Http\Controllers\GetComicsController@getComicById');
// Route to get characters by comic id
Route::get('/getCharactersById/{comicId}', 'App\Http\Controllers\GetComicsController@getCharactersById');
// Route to get characters by character name
Route::get('/getCharacterByName/{name}', 'App\Http\Controllers\GetComicsController@getCharacterByName');
// Route to get creators by comic id
Route::get('/getCreatorsById/{comicId}', 'App\Http\Controllers\GetComicsController@getCreatorsById');

