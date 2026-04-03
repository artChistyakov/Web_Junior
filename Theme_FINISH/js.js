$(document).ready(function() {
  $(".theme").on('click', function() {
    $("body").toggleClass("dark");
    $(".theme").toggleClass("dark light");
    if(($(".theme").attr("class"))!="theme dark"){
    	$(".theme").text("Theme Light");
    }
    else {
    	$(".theme").text("Theme DARK");
    }
  });
});
