$(document).ready(function(){
  var $menuTab = $("#menutab");
  var $menuList = $('.overlay');
  var $menuItems = $("li");
  var $signUp = $(".signupbtn")
  var $cancel = $(".cancel")

  //click on icon show and hide menu
  $menuTab.click(function(){
    $menuTab.toggleClass("rotate");//rotate icon on click
    $menuList.toggleClass("showmenu"); //show menu
    //blur background of main content
  });
  //click on list item hidemenu
  $menuItems.on("click", function(){
    $menuList.toggleClass("showmenu");//hide menu
    $menuTab.toggleClass("rotate");// rotate icon back
  });

  //click on signup to show signup box
  $signUp.on("click",function(){
    $(".signup").show("slow");
  })

  //hide sign up
  $cancel.click(function(){
    $(".signup").hide("slow");
  });

  $(".searchBtn").click(getWeather);

  //ajax request to connect to api
  function getWeather(city){
  var weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=";
  var weatherCity = "http://api.openweathermap.org/data/2.5/weather?q="
  var apiKey = "&APPID=8d3bcd3e412a8f4ca6bb2b0183ea2c78";
  var city = "q=losangeles";
  var metric = "units=metric";
  var imperial = "units=imperial";


  $.ajax({
    url: weatherCity + city + imperial + apiKey,
    success: function(data){
      console.log("success", data);
    },
  });
};
  // var jqxhr = $.ajax( weatherAPI + apiKey )
  //   .done(function() {
  //     alert( "success" );
  //   })
  //   .fail(function() {
  //     alert( "error" );
  //   })
  //   .always(function() {
  //     alert( "complete" );
  //   });




});


// var xhr = new XMLHttpRequest(),
//     method = "GET",
//     url = "https://api.flickr.com/services/rest/?method=flickr.test.echo&name=value";
//
// xhr.open(method, url, true);
// xhr.onreadystatechange = function () {
//   if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//     console.log("ready");
//   }
// };
// xhr.send();
