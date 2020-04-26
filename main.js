$(document).ready(function() {
  $("button").click(function(){
  $('.locandine').html("");
    var stringa_richiesta = $('#barra').val();

    $.ajax({
      url: "https://api.themoviedb.org/3/search/tv",
      method:"GET",
      data: {
        api_key:"dd5e69fc00c020f73ba359c5c8fea660",
        language: "it-IT",
        query: stringa_richiesta
      },
      success: function(data) {
        stampafilmserie(data, "serie");
      }
    });

    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method:"GET",
      data: {
        api_key:"dd5e69fc00c020f73ba359c5c8fea660",
        language: "it-IT",
        query: stringa_richiesta
      },
      success:function(data) {
        stampafilmserie(data, "film");
      }
    });


  });



  });

  //tipo  == serie o  film
  function stampafilmserie(data , tipo ){

    var elencoFilm = data.results;
    //recupero il mio template
    var sorgenteTemplate = $("#entry-template").html();
    //lo passo ad handlebars
    var template = Handlebars.compile(sorgenteTemplate);
    for(var i = 0; i < elencoFilm.length; i++) {
      var film = elencoFilm[i];
      var stelle_piene ="";
      var stelle_vuote="";
      var numero = film.vote_average;
      var numero=Math.ceil(numero/2);
      for (var j=0; j<5;j++){
        //   <i class="fas fa-star"></i>
        if(j < numero){
            //stelle piene
            stelle_piene = "<i class='fas fa-star '></i>" + stelle_piene;

        }else{
          //stelle vuote
          stelle_vuote = "<i class='far fa-star '></i>" + stelle_vuote;
        }

      }
      var stelle = stelle_piene+stelle_vuote;
      console.log(film);
      var  titolo = "";
      var  titolo_originale="";
      var foto="";
      if(tipo=="serie"){
        titolo = film.name;
        titolo_orginiale= film.original_name;
      }
      else{
        titolo = film.title;
        titolo_orginiale= film.original_title;
      }
      if (film.poster_path == "null"){
        foto= '<img src ="nero.jpg">';
      }
      else{
        var foto="https://image.tmdb.org/t/p/w342/"+film.poster_path;
      }
      var bandiera;
      bandiera = '<img src ="'+film.original_language+'.jpg">';
      if (film.overview==""){
        overview="contenuto non disponibile";
            }
            else{
              overview=film.overview;
            }
      var parametri = {
        title:titolo,
        original_title : titolo_orginiale,
        original_language: bandiera,
        vote_average: stelle,
        immagine: foto,     //"https://image.tmdb.org/t/p/w342/"+film.poster_path, //'<img src="https://image.tmdb.org/t/p/w300/'+film.poster_path+'">',
        overview:film.overview,
      };
      //genero html
      var htmlGenerato = template(parametri);
      //lo stampo nell'html
      $('.locandine').append(htmlGenerato);

    }
  }
