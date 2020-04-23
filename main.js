$(document).ready(function() {
  $("button").click(function(){

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
        var elencoFilm = data.results;
        //recupero il mio template
        var sorgenteTemplate = $("#entry-template").html();
        //lo passo ad handlebars
        var template = Handlebars.compile(sorgenteTemplate);
        for(var i = 0; i < elencoFilm.length; i++) {
          var film = elencoFilm[i];
          console.log(film)
          var parametri = {
            title:film.name,
            original_title : film.original_name,
            original_language: film.original_language,
            vote_average: film.vote_average,
          };
          //genero html
          var htmlGenerato = template(parametri);
          //lo stampo nell'html
          $('.locandine').append(htmlGenerato);
        }
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
      success: function(data) {
        var elencoFilm = data.results;
        //recupero il mio template
        var sorgenteTemplate = $("#entry-template").html();
        //lo passo ad handlebars
        var template = Handlebars.compile(sorgenteTemplate);
        for(var i = 0; i < elencoFilm.length; i++) {
          var film = elencoFilm[i];
          console.log(film)
          var parametri = {
            title:film.title,
            original_title : film.original_title,
            original_language: film.original_language,
            vote_average: film.vote_average,
          };
          //genero html
          var htmlGenerato = template(parametri);
          //lo stampo nell'html
          $('.locandine').append(htmlGenerato);
        }
      }
    });


  });

});
