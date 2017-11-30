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

  $(".backbtn, .home").click(function(){
    $(".searchResults").addClass("hideSearchresults");
    $(".welcomepage").show();
    $(".searchbox").val("")
  });


  $("#cbutton").click(function(){
    //turn on Cbutton turn off fbutton
    $(this).addClass("onbtn").val("on");
      $("#fbutton").removeClass("onbtn").val("off");
      //turn on fbutton turn off cbutton
      $("#fbutton").click(function(){
        $(this).addClass("onbtn").val("on");
          $("#cbutton").removeClass("onbtn").val("off");
    });
  });



  //ajax request to connect to api
  function getWeather(city){
  var weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=";
  var weatherCity = "http://api.openweathermap.org/data/2.5/weather?"
  var apiKey = "&APPID=8d3bcd3e412a8f4ca6bb2b0183ea2c78";
  var city = "q=" + $(".searchbox").val();
  var metric = "&units=metric";
  var imperial = "&units=imperial";
  var fcButton;

  if($("#fbutton").val()==="on"){
     fcButton = "&units=imperial";
  }else{
    fcButton = "&units=metric";
  }


  $.ajax({
    url: weatherCity + city + fcButton + apiKey,
    success: function(data){

      var cityName = document.getElementById("city");
      var description = ["description", "icon"];
      var highlow = ["temp" ,"humidity"];

        //background switch statement
        var background = data.weather['0'].icon;
        switch(background){
            case '01n':
            case '01d':
              console.log("1");    $(".searchResults").css("background-image", "url('http://allswalls.com/images/clear-sky-wallpaper-3.jpg')");
                break;
            case '02n':
            case '02d':
              console.log("1");    $(".searchResults").css("background-image", "url('https://aujasus.files.wordpress.com/2011/04/amazon-and-the-cloud.jpg')");
                break;
            case '03n':
            case '03d':
              console.log("1");    $(".searchResults").css("background-image", "url('https://images.freeimages.com/images/large-previews/c1a/blue-sky-and-clouds-1400674.jpg')");
                break;
            case '04n':
            case '04d':
              console.log("1");    $(".searchResults").css("background-image", "url('https://img00.deviantart.net/fa39/i/2015/052/6/1/broken_clouds_by_leo_6tos-d8ixdlv.jpg')");
                break;
            case '09n':
            case '09d':
              console.log("1");    $(".searchResults").css("background-image", "url('https://i.pinimg.com/736x/3c/88/a4/3c88a4c7142345ccf72b69afd51301a9--rainy-morning-iphone-wallpaper.jpg')");
                break;
            case '10n':
            case '10d':
              console.log("1");    $(".searchResults").css("background-image", "url('https://i.pinimg.com/736x/3c/88/a4/3c88a4c7142345ccf72b69afd51301a9--rainy-morning-iphone-wallpaper.jpg')");
                break;
            case '11n':
            case '11d':
              console.log("1");    $(".searchResults").css("background-image", "url('https://i.pinimg.com/736x/ca/3b/ff/ca3bff05bbaa2a87865de9a1668c6884--lightning-storms-lightning-strikes.jpg')");
                break;
            case '13n':
            case '13d':
              console.log("1");    $(".searchResults").css("background-image", "url('https://arch5541.files.wordpress.com/2012/11/snow.jpg')");
                break;
            case '50n':
            case '50d':
              console.log("1");    $(".searchResults").css("background-image", "url('https://i.imgur.com/dsQ2LMh.jpg')");
                break;
            default:$(".searchResults").css("background-image", "url('https://i.imgur.com/dsQ2LMh.jpg')");
            console.log('2');

        };


        console.log("success", data);

        //hide welcome page after search
        $(".welcomepage").hide();

        //show results after search
        $(".searchResults").removeClass("hideSearchresults");

        //data displayed from object results for city and current temp
          cityName.innerHTML = data.name + ", " + data.sys.country;

          //loop through weather array
        $.each(data.weather["0"], function(i){
            $.each(description, function(j){
                if(description[j]==[i]){
                    document.getElementById(description[j]).innerHTML = data.weather["0"][i];
                    if(description[j]=="icon"){
                      var icon = data.weather["0"].icon;
                      //append icon
                      console.log(data.weather["0"].icon)
                      $("#icon").prepend("<img src='http://openweathermap.org/img/w/" + icon + ".png'>" );
                    };
                };
            });
        });
            //loop through array
          $.each(highlow, function(i){
              //loop through api main
              $.each(data.main, function(j){
                //if statements for matching class with object
                if(highlow[i]==[j]){
                  //if statement for degree symbol
                    if(highlow[i]=="temp"){
                    document.getElementById(highlow[i]).innerHTML = Math.round(data.main[j]) + "°";
                    //else statement for percentage symbol
                  }else{
                    document.getElementById(highlow[i]).innerHTML = Math.round(data.main[j]) + "%";
                  };
                };
              });
        });
    },

  });
};

});
