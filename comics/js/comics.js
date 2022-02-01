// Global variables
var offset      = 0;
var url         = window.location.href;

// Docummet starts here
$(document).ready(function() {

    // Set images
    $("#favicon").attr("href",url+"images/marvel_logo.jpg");
    $("#header_image").attr("src",url+"images/marvel_logo.jpg");

    $('.see_more_button').hide();

    getAllComics();

});

// List all comics
function getAllComics(){
    $('#loader_modal').modal('show');
    $.ajax({
        url : url+'api_call/comics.php',
        method : 'POST',
        data : {
            'action' : 'getAll',
            'offset' : offset
        },
        dataType:'JSON',
        success: function(response) {                              
            $('#loader_modal').modal('hide');

            var putIn = $('#comics_main');
            var html = '';

            for (let i = 0; i < response.data.results.length; i++) {
                var imageSrc = '';
                var price = '';
                
                if(typeof response.data.results[i].images[0] == 'undefined'){
                    if(typeof response.data.results[i].thumbnail == 'undefined'){
                        imageSrc = url+"/images/no_image.jpg";
                    }else{                    
                        imageSrc = response.data.results[i].thumbnail.path + '.' + response.data.results[i].thumbnail.extension;
                    }
                }else{                    
                    imageSrc = response.data.results[i].images[0].path + '.' + response.data.results[i].images[0].extension;
                }

                if(response.data.results[i].prices[0].price > 0){
                    price = '$ '+response.data.results[i].prices[0].price;
                }else{
                    price = '<i class="fas fa-ban"></i> No offers available';
                }
                
                
                html += '<div class="comics_box col-lg-4 col-md-4 col-sm-6 col-xs-6">'+
                            '<img src="'+imageSrc+'"class="img-fluid">'+
                            '<p class="box_title">'+response.data.results[i].title+'</p>'+
                            '<p class="box_price">'+price+'</p>'+
                            '<button class="box_btn_more btn btn-primary" onclick="getComicById('+response.data.results[i].id+')">See More</button>'+
                            '<button class="box_btn_cart btn btn-success">Add to cart</button>'+
                        '</div>';
            }

            putIn.append(html);
            $('.see_more_button').show();

            offset = offset + 20;
        },
        error: function(request)
        {
            $('#loader_modal').modal('hide');
            console.log("Request: "+JSON.stringify(request));
        }
    });
}

// List Comics by id
function listComicsById(comicId){
    $.ajax({
        url : url+'api_call/comics.php',
        method : 'POST',
        data : {
            'action' : 'getById',
            'comicId' : comicId
        },
        dataType:'JSON',
        success: function(response) {              
            var putIn = $('#comics_main');
            var html = '';

            for (let i = 0; i < response.data.results.length; i++) {
                var imageSrc = '';
                var price = '';
                
                if(typeof response.data.results[i].images[0] == 'undefined'){
                    if(typeof response.data.results[i].thumbnail == 'undefined'){
                        imageSrc = url+"/images/no_image.jpg";
                    }else{                    
                        imageSrc = response.data.results[i].thumbnail.path + '.' + response.data.results[i].thumbnail.extension;
                    }
                }else{                    
                    imageSrc = response.data.results[i].images[0].path + '.' + response.data.results[i].images[0].extension;
                }

                if(response.data.results[i].prices[0].price > 0){
                    price = '$ '+response.data.results[i].prices[0].price;
                }else{
                    price = '<i class="fas fa-ban"></i> No offers available';
                }
                
                
                html += '<div class="comics_box col-lg-4 col-md-4 col-sm-6 col-xs-6">'+
                            '<img src="'+imageSrc+'"class="img-fluid">'+
                            '<p class="box_title">'+response.data.results[i].title+'</p>'+
                            '<p class="box_price">'+price+'</p>'+
                            '<button class="box_btn_more btn btn-primary" onclick="getComicById('+response.data.results[i].id+')">See More</button>'+
                            '<button class="box_btn_cart btn btn-success">Add to cart</button>'+
                        '</div>';
            }
            putIn.append(html);
        },
        error: function(request)
        {
            $('#loader_modal').modal('hide');
            console.log("Request: "+JSON.stringify(request));
        }
    });
}

// Get comic by id
function getComicById(comicId){
    $('#loader_modal').modal('show');
    $.ajax({
        url : url+'api_call/comics.php',
        method : 'POST',
        data : {
            'action' : 'getById',
            'comicId' : comicId
        },
        dataType:'JSON',
        success: function(response) {              
            var comicTitle          = $("#comic_title");
            var comicTitleResult    = response.data.results[0].title;
            comicTitle.html(comicTitleResult);

            var imageSrc    = '';
            if(typeof response.data.results[0].images[0] == 'undefined'){
                imageSrc = url+"/images/no_image.jpg";
            }else{                    
                imageSrc = response.data.results[0].images[0].path + '.' + response.data.results[0].images[0].extension;
            }
            $("#comic_image").attr("src",imageSrc);

            getCharactersByComicId(response.data.results[0].id);
            getCreatorsByComicId(response.data.results[0].id);

            var comicPrice  = $("#comic_price");
            var priceHtml   = '';

            if(response.data.results[0].prices[0].price > 0){
                priceHtml = '<button class="btn_comic_price btn btn-success"> Add to cart | $ '+response.data.results[0].prices[0].price+' </button>';
            }else{
                priceHtml = '<i class="fas fa-ban"></i> No offers available';
            }
            
            comicPrice.html(priceHtml);

            $('#loader_modal').modal('hide');
            $('#comic_modal').modal('show');
        },
        error: function(request)
        {
            $('#loader_modal').modal('hide');
            console.log("Request: "+JSON.stringify(request));
        }
    });
}

// Get characters by comic id
function getCharactersByComicId(comicId){
    $.ajax({
        url : url+'api_call/comics.php',
        method : 'POST',
        data : {
            'action' : 'getCharactersById',
            'comicId' : comicId
        },
        dataType:'JSON',
        async: false,
        success: function(response) {
            var charactersTitle = $("#comics_characters_title");
            var putIn           = $("#comics_characters");
            putIn.html('');
            var html            = '';  
            var imageSrc        = '';
            var characters      = '';            
            if(response.data.results.length > 3){
                for (let i = 0; i < 3; i++) {
                    
                    characters = 'Characters (Showing 3 of '+response.data.results.length+').';

                    if(typeof response.data.results[i].thumbnail == 'undefined'){
                        imageSrc = url+"/images/no_image.jpg";
                    }else{                    
                        imageSrc = response.data.results[i].thumbnail.path + '.' + response.data.results[i].thumbnail.extension;
                    }

                    html += '<div class="comics_modal_box col-lg-4 col-md-4 col-sm-6 col-xs-6">'+
                                '<img src="'+imageSrc+'" class="img-fluid">'+
                                '<p class="comics_title">'+response.data.results[i].name+'</p>'+
                            '</div>';
                }
            }else{
                for (let i = 0; i < response.data.results.length; i++) {

                    characters = 'Characters (Showing '+response.data.results.length+' of '+response.data.results.length+').';

                    if(typeof response.data.results[i].thumbnail == 'undefined'){
                        imageSrc = url+"/images/no_image.jpg";
                    }else{                    
                        imageSrc = response.data.results[i].thumbnail.path + '.' + response.data.results[i].thumbnail.extension;
                    }

                    html += '<div class="comics_modal_box col-lg-4 col-md-4 col-sm-6 col-xs-6">'+
                                '<img src="'+imageSrc+'" class="img-fluid">'+
                                '<p class="comics_title">'+response.data.results[i].name+'</p>'+
                            '</div>';
                }
            }

            charactersTitle.html(characters);

            if(html){
                putIn.html(html);
            }else{
                putIn.html('<p>No characters found!.</p>');
            }

            
        },
        error: function(request)
        {
            $('#loader_modal').modal('hide');
            console.log("Request: "+JSON.stringify(request));
        }
    });
}

// Get characters by name
function getCharacterByName(name){

    name = $.trim(name).toLowerCase();

    $('#loader_modal').modal('show');
    $.ajax({
        url : url+'api_call/comics.php',
        method : 'POST',
        data : {
            'action' : 'getCharacterByName',
            'name' : name
        },
        dataType:'JSON',
        success: function(response) { 

            if(response.data.results.length > 0){
                for (let i = 0; i < response.data.results[0].comics.items.length; i++) {

                    var id = response.data.results[0].comics.items[i].resourceURI.split('/').pop();
    
                    $('#comics_main').html('');
                    $('.see_more_button').hide();
    
                    listComicsById(id);
                    
                }
            }else{
                $('#comics_main').html('<h3> No results found. </h3>');
                $('.see_more_button').hide();
            }
            

            $('#loader_modal').modal('hide');
        },
        error: function(request)
        {
            $('#loader_modal').modal('hide');
            console.log("Request: "+JSON.stringify(request));
        }
    });

}

// Get creators by comic id
function getCreatorsByComicId(comicId){
    $.ajax({
        url : url+'api_call/comics.php',
        method : 'POST',
        data : {
            'action' : 'getCreatorsById',
            'comicId' : comicId
        },
        dataType:'JSON',
        async: false,
        success: function(response) {
            var creatorsTitle = $("#comics_creators_title");
            var putIn           = $("#comics_creators");
            putIn.html('');
            var html            = '';  
            var imageSrc        = '';  
            var creators        = '';          
            if(response.data.results.length > 3){
                for (let i = 0; i < 3; i++) {

                    creators = 'Creators (Showing 3 of '+response.data.results.length+').';
                
                    if(typeof response.data.results[i].thumbnail == 'undefined'){
                        imageSrc = url+"/images/no_image.jpg";
                    }else{                    
                        imageSrc = response.data.results[i].thumbnail.path + '.' + response.data.results[i].thumbnail.extension;
                    }

                    html += '<div class="comics_modal_box col-lg-4 col-md-4 col-sm-6 col-xs-6">'+
                                '<img src="'+imageSrc+'" class="img-fluid">'+
                                '<p class="comics_title">'+response.data.results[i].fullName+'</p>'+
                            '</div>';
                }
            }else{
                for (let i = 0; i < response.data.results.length; i++) {

                    creators = 'Creators (Showing '+response.data.results.length+' of '+response.data.results.length+').';

                    if(typeof response.data.results[i].thumbnail == 'undefined'){
                        imageSrc = url+"/images/no_image.jpg";
                    }else{                    
                        imageSrc = response.data.results[i].thumbnail.path + '.' + response.data.results[i].thumbnail.extension;
                    }

                    html += '<div class="comics_modal_box col-lg-4 col-md-4 col-sm-6 col-xs-6">'+
                                '<img src="'+imageSrc+'" class="img-fluid">'+
                                '<p class="comics_title">'+response.data.results[i].fullName+'</p>'+
                            '</div>';
                }
            }

            creatorsTitle.html(creators);

            if(html){
                putIn.html(html);
            }else{
                putIn.html('<p>No creators found!.</p>');
            }

            
        },
        error: function(request)
        {
            $('#loader_modal').modal('hide');
            console.log("Request: "+JSON.stringify(request));
        }
    });
}

// Get searched name
function getCharacterName(){
    var name = $("#searchByName").val();
    if(name == ''){
        $('#comics_main').html('');
        offset = 0;
        getAllComics();
    }else{
        name = name.replace(' ', '%20');
        getCharacterByName(name);
    }  
}