jQuery(function($) {



$(function()
	{ $.getJSON("https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=ee316f45a2f64f938f9d40d6684c323c", 
		function(data){ 
		var art= data.articles 
$(".news").append(art[0].title );
$(".des").append(art[0].description );
$(".url").append(art[0].url); 

$(".img1").attr('src', art[0].urlToImage);


$(".news2").append(art[1].title );
$(".des2").append(art[1].description );
$("img2").append("" + art[1].urltoImage + ""); 
$(".img2").attr('src', art[1].urlToImage);

$(".news3").append(art[2].title );
$(".des3").append(art[2].description );
$("img3").append("" + art[2].urltoImage + ""); 
$(".img3").attr('src', art[2].urlToImage);


 
			console.log(art[i].title); 

	});
});
 

// new york API code

 var url = "https://api.nytimes.com/svc/news/v3/content/all/all.json";
url += '?' + $.param({
  'api-key': "6371972ccdbd4869a163dd80176728e8"
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
	var blogs = result.results;
  $(".weburl").append(blogs[0].title);
$(".snippet").append(blogs[0].abstract);
$(".byline").append(blogs[0].byline);
$(".pdate").append(blogs[0].published_date);
$(".source").append(blogs[0].source);
$("#url1").attr("href", blogs[0].url);

$(".weburl2").append(blogs[1].title);
$(".snippet2").append(blogs[1].abstract);
$(".byline2").append(blogs[1].byline);
$(".pdate2").append(blogs[1].published_date);
$(".source2").append(blogs[1].source);
$("#url").attr("href", blogs[1].url);

$(".weburl3").append(blogs[2].title);
$(".snippet3").append(blogs[2].abstract);
$(".byline3").append(blogs[2].byline);
$(".pdate3").append(blogs[2].published_date);
$(".source3").append(blogs[2].source);
$("#url3").attr("href", blogs[2].url);



// $(".url").append(blogs[0].url); 

// $(".img1").attr('src', art[0].urlToImage);


}).fail(function(err) {
  throw err;
});
	//#main-slider
	$(function(){
		$('#main-slider.carousel').carousel({
			interval: 8000
		});
	});
	
	
	//Initiat WOW JS
	new WOW().init();
	
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollup').fadeIn();
			} else {
				$('.scrollup').fadeOut();
			}
		});
		$('.scrollup').click(function(){
			$("html, body").animate({ scrollTop: 0 }, 1000);
				return false;
		});
	
	// portfolio filter
	$(window).load(function(){'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : '.portfolio-item',
			layoutMode : 'fitRows'
		});
		
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});


	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});	
});