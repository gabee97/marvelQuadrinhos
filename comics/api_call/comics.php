<?php

// Get action
$action = $_POST['action'];

// Switch action
switch($action){
    // Case get all, get all comics
    case 'getAll':

        echo json_encode(getAllComics($_POST['offset']));

        break;
    
    // Case get by id, get comic by comic id
    case 'getById':

        echo json_encode(getComicById($_POST['comicId']));

        break;

    // Case get characters by id, get characters by comic id
    case 'getCharactersById':

        echo json_encode(getCharactersById($_POST['comicId']));

        break;

    // Case get characters by name, get character by character name
    case 'getCharacterByName':

        echo json_encode(getCharacterByName($_POST['name']));

        break;
        
    // Case get creators by name, get creators by comic id
    case 'getCreatorsById':

        echo json_encode(getCreatorsById($_POST['comicId']));

        break;
}

//Calling api to get all comics
function getAllComics($offset){   
    
    $url = 'localhost:8000/getAllComics/'.$offset;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $data = curl_exec($ch);

    $obj = json_decode($data);

    return $obj;
}

//Calling api to get comic by id
function getComicById($comicId){   
    
    $url = 'localhost:8000/getComicById/'.$comicId;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $data = curl_exec($ch);

    $obj = json_decode($data);

    return $obj;
}

//Calling api to get characters by comic id
function getCharactersById($comicId){   
    
    $url = 'localhost:8000/getCharactersById/'.$comicId;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $data = curl_exec($ch);

    $obj = json_decode($data);

    return $obj;
}

//Calling api to get characters by name
function getCharacterByName($name){   
    
    $url = 'localhost:8000/getCharacterByName/'.$name;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $data = curl_exec($ch);

    $obj = json_decode($data);

    return $obj;
}

//Calling api to get creators by comic id
function getCreatorsById($comicId){   
    
    $url = 'localhost:8000/getCreatorsById/'.$comicId;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $data = curl_exec($ch);

    $obj = json_decode($data);

    return $obj;
}

?>