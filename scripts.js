$(document).ready(function(){
  var $menuTab = $("#menutab");
  var $menuList = $('.overlay');
  var $menuItems = $("li");
  var $signUp = $(".signupbtn");
  var $cancel = $(".cancel");

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

  $(".backbtn").click(function(){
    $(".searchResults").addClass("hideSearchresults");
    $(".welcomepage").show();
    $(".searchbox").val("")
  });



  //ajax request to connect to api
  function getWeather(city){
  var weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=";
  var weatherCity = "http://api.openweathermap.org/data/2.5/weather?"
  var apiKey = "&APPID=8d3bcd3e412a8f4ca6bb2b0183ea2c78";
  var city = "q=" + $(".searchbox").val();
  var metric = "&units=metric";
  var imperial = "&units=imperial";

  $.ajax({
    url: weatherCity + city + imperial + apiKey,
    success: function(data){

      var cityName = document.getElementById("city");
      var temp = document.getElementById("temp");
      var descript = document.getElementById("descript");

        console.log("success", data);

        //hide welcome page after search
        $(".welcomepage").hide();

        //show results after search
        $(".searchResults").removeClass("hideSearchresults");

        //data displayed from object results for city and current temp
          cityName.innerHTML = data.name + ", " + data.sys.country;
          temp.innerHTML = Math.round(data.main.temp) + "°";

          //loop through weather array
        $.each(data.weather, function(i){
          console.log(data.weather[i].description);
              descript.innerHTML = data.weather[i].description;
        });
    },
  });
};

});
