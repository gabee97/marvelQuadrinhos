<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;



class GetComicsController extends Controller
{
    // Get all comics
    function getAllComics($ofsset){
        $url = 'http://gateway.marvel.com/v1/public/comics?ts=1643421588&apikey=36aa675e4e90b2e10bc4bab32403cdad&hash=e5f95a22aaa6d0e95e1e5af74e20298e&offset='.$ofsset.'';
        
        $response = Http::get($url);

        return $response;
    }

    // Get comic by id
    function getComicById($comicId){
        $url = 'http://gateway.marvel.com/v1/public/comics/'.$comicId.'?ts=1643421588&apikey=36aa675e4e90b2e10bc4bab32403cdad&hash=e5f95a22aaa6d0e95e1e5af74e20298e';
        
        $response = Http::get($url);

        return $response;
    }

    // Get characters by comic id
    function getCharactersById($comicId){
        $url = 'http://gateway.marvel.com/v1/public/comics/'.$comicId.'/characters?ts=1643421588&apikey=36aa675e4e90b2e10bc4bab32403cdad&hash=e5f95a22aaa6d0e95e1e5af74e20298e';
        
        $response = Http::get($url);

        return $response;
    }

    // Get characters by character name
    function getCharacterByName($name){
        $url = 'https://gateway.marvel.com:443/v1/public/characters?name='.$name.'&ts=1643421588&apikey=36aa675e4e90b2e10bc4bab32403cdad&hash=e5f95a22aaa6d0e95e1e5af74e20298e';

        $response = Http::get($url);

        return $response;
        
    }

    // Get creators by comic id
    function getCreatorsById($comicId){
        $url = 'http://gateway.marvel.com/v1/public/comics/'.$comicId.'/creators?ts=1643421588&apikey=36aa675e4e90b2e10bc4bab32403cdad&hash=e5f95a22aaa6d0e95e1e5af74e20298e';
        
        $response = Http::get($url);

        return $response;
    }

}
