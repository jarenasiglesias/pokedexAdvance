var $textBoxPokemon = $('#searchPokemon');
var $textBoxType = $('#searchType');
var $buttonPokemon = $('#btn-pokemon');
var $buttonType = $('#btn-type');

$buttonPokemon.on("click", function(e) {
  e.preventDefault();
  $.get('http://pokeapi.co/api/v1/pokemon/' + $textBoxPokemon.val()+"/", function getPokemon (response){  
  var types = response.types;
  var descriptionUri = response.descriptions[1].resource_uri;
  var imgUri = "http://pokeapi.co" + response.sprites[0].resource_uri;
  var urlApi = "http://pokeapi.co" + descriptionUri;
  $('.row-bg').removeAttr("hidden");
  $('.empty').children().empty();
  $('.pkmnName').append("<h2>" + "Name: " + response.name + "</h2>");
  $('h3').append("Type: ");
  response.types.forEach(function(element,i,types){  
    $('h3').append(types[i].name +" ");
    })
  $.get(imgUri, function getDescription( response){
    $('.pkmnImg').attr('src',"http://pokeapi.co" + response.image);
    });

  $('.descTitle').append("<h2>" + "Description: " + "</h2>");

  $.get(urlApi, function getDescription( response){
    $('.desc').append(response.description);
    });
  
  });
});

$buttonType.on("click", function(e) {
  e.preventDefault();
 
  $.get('http://pokeapi.co/api/v2/type/' + $textBoxType.val()+"/", function getType (response){  
  $('.empty').children().empty();
  var pokemonsNames = [];
  var pokemons = response.pokemon;
  $('.row-bg').removeAttr("hidden");
  $('.pkmnName').append("<h2>" + "Name:" + "</h2>");
  $('h3').append("Type: " + response.name);

  for (var i=0; i<10; i++ ){
      pokemonsNames[i] = pokemons[i].pokemon.name;
      $('.pkmnName').append("<h3>" + pokemonsNames[i] + "</h3>");
       //inicializa cogiendo la primera imagen del objeto de artista
    
  };
  });
});

