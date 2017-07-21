var $textBoxPokemon = $('#searchPokemon');
var $textBoxType = $('#searchType');
var $buttonPokemon = $('#btn-pokemon');
var $buttonType = $('#btn-type');
var $buttonEvo = $('#btn-evolutions');

var obj;

$buttonPokemon.on("click", function(e) {
    e.preventDefault();
    $.get('http://pokeapi.co/api/v1/pokemon/' + $textBoxPokemon.val() + "/", function getPokemon(response) {
        obj = response;
        $('.empty').children().empty();
        var types = response.types;
        var descriptionUri = response.descriptions[1].resource_uri;
        var imgUri = "http://pokeapi.co" + response.sprites[0].resource_uri;

        $.get(imgUri, function getDescription(response) {
            $('.pkmnImg').attr('src', "http://pokeapi.co" + response.image);
        });

        var urlApi = "http://pokeapi.co" + descriptionUri;
        $('.row-bg').removeAttr("hidden");
        $('.pkmnName').append("<h2>" + "Name: " + response.name + "</h2>");
        $('h3').append("Type: ");
        response.types.forEach(function(element, i, types) {
            $('h3').append(types[i].name + " ");
        })

        $('.descTitle').append("<h2>" + "Description: " + "</h2>");

        $.get(urlApi, function getDescription(response) {
            $('.desc').append(response.description);
        });

        if (response.evolutions.length > 0) {
            $buttonEvo.removeAttr('hidden');
        } else {
            $buttonEvo.attr('hidden', '');
        }

    });
});

$buttonType.on("click", function(e) {
    e.preventDefault();
    $.get('http://pokeapi.co/api/v2/type/' + $textBoxType.val() + "/", function getType(response) {
        $('.empty').children().empty();
        var pokemonsNames = [];
        var pokemons = response.pokemon;
        $('.row-bg').removeAttr("hidden");
        $('.pkmnName').append("<h2>" + "Name:" + "</h2>");
        $('h3').append("Type: " + response.name);

        for (var i = 0; i < 10; i++) {
            pokemonsNames[i] = pokemons[i].pokemon.name;
            $('.pkmnName').append("<h3>" + pokemonsNames[i] + "</h3>");
            //inicializa cogiendo la primera imagen del objeto de artista

        };

        $('.pkmnImg').removeAttr('src');

    });
});

$buttonEvo.on("click", function(e) {
    e.preventDefault();
    $.get('http://pokeapi.co/api/v1/pokemon/' + $textBoxPokemon.val() + "/", function getPokemon(response) {
    	var evoArray = response.evolutions;
    	for(var i = 1;evoArray.length > i; i++){ 		
    		$.get("http://pokeapi.co" + evoArray[1].resource_uri, function getPokemon(response) {
    			var evoUri = "http://pokeapi.co" + response.sprites[0].resource_uri;
    			$.get(evoUri, function getDescription(response) {
    				console.log("http://pokeapi.co" + response.image);
        		$('.pkmnName').append("<img src=" + "http://pokeapi.co" + response.image + "></img>");
            //$('.evoImg').attr('src',"http://pokeapi.co" +  response.image);
        	});
        	$('.pkmnName').append("<h2>" + "Evolution: " + evoArray[1].to + "</h2>");
    		});
    	}

    });
});