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

  //ajax request to connect to api
  var weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=";
  var apiKey = "8d3bcd3e412a8f4ca6bb2b0183ea2c78";
  var city = "";
  var options = {
    tags: "panda",
    format:"json"
  };

  var jqxhr = $.ajax( weatherAPI + apiKey )
    .done(function() {
      alert( "success" );
    })
    .fail(function() {
      alert( "error" );
    })
    .always(function() {
      alert( "complete" );
    });

  $("searchBtn").click(function(event){
    event.preventDefault();
    $.getJSON(weatherAPI, options, displayPhotos);
  });


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
