
jQuery(function($) {

$(function()
  { $.getJSON("https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=ee316f45a2f64f938f9d40d6684c323c", 
    function(data){ 
    var art= data.articles 
$(".news").append(art[0].title );
$(".des").append(art[0].description );
// $(".url").append(art[0].url); 

$(".img1").attr('src', art[0].urlToImage);


$(".news2").append(art[1].title );
$(".des2").append(art[1].description );
$("img2").append("" + art[1].urltoImage + ""); 
$(".img2").attr('src', art[1].urlToImage);

$(".news3").append(art[2].title );
$(".des3").append(art[2].description );
$("img3").append("" + art[2].urltoImage + ""); 
$(".img3").attr('src', art[2].urlToImage);


      console.log(eart[2].title); 

  });
});


});