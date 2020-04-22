// $(document).ready(function(){
//   $.ajax({
//     url : "https://api.themoviedb.org/3/movie/550?api_key=dd5e69fc00c020f73ba359c5c8fea660",
//     method : "GET",
//     data: {
//       api_key:dd5e69fc00c020f73ba359c5c8fea660,
//     }
//
// });
// });
var source = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);
var context = { title: "My New Post", body: "This is my first post!" };
var html = template(context);
