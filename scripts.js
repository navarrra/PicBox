$(document).ready(function(){

  //variables for menu
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

  //Search button with ajax call function
  $(".searchBtn").click(getWeather);

//back button
  $(".backbtn, .home, .searchsub").click(function(){
    $(".searchResults").addClass("hideSearchresults");
    $(".welcomepage").show();
    $(".searchbox").val("");
  });

  //CF buttons
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

  //started underline function for large submenu
  $(".three_day").click(function(){
        $(".current").removeClass("underline");
        $(this).addClass("underline");
        $(".current").click(function(){
            $(this).addClass("underline");
            $(".three_day").removeClass("underline");
        });
  });

  //click on current submenu to move it back to center
  $(".current").click(function(){
        $("#current").show().animate({"left": "0%"});
        $("#current").val("on");
        $("#weekday_short").hide();
        $(".three_day").click(function(){
            $("#weekday_short").show();
        });
      });



  var apiKey = "72524e825328238b";
  var fcButton;

  //ajax request to connect to api
  function getWeather(city){
  // var urls = [/*"http://api.openweathermap.org/data/2.5/forecast?"*/, "http://api.openweathermap.org/data/2.5/weather?"];
  var weatherCity = "https://api.wunderground.com/api/"
  var city =   $(".searchbox").val() + ".json";
  var conditions = "/conditions" + "/q/";
  var forecast = "/forecast" + "/q/";

  $.ajax({
    url: weatherCity + apiKey + conditions + city,
    success: function(data){
      var temp = document.getElementById("temp_f");
      var cityName = document.getElementById("city");
      var description = ["weather", "icon_url", "precip_today_in"];
      console.log(data)
        //if statement for metric and imperial unit assignment
  try{
      if($("#fbutton").val()==="on"){
         fcButton = temp.innerHTML = Math.round(data.current_observation.temp_f) + '°';
      }else{
         fcButton = temp.innerHTML = Math.round(data.current_observation.temp_c) + '°';
      };

    } catch(error){
          $(".error").append('<p class="err">please include city and state</p>');

    };

        //background switch statement
        var background = data.current_observation.icon;
        switch(background){

            case 'clear':
            case 'sunny':
            case 'mostlysunny':
              console.log("1");    $(".searchResults").css("background-image", "url('https://rawgit.com/navarrra/weatherBox/master/backgrounds/sunnyback.jpg')");
                break;
            case 'partlycloudy':
            case 'partlysunny':
              console.log("1");    $(".searchResults").css("background-image", "url('https://rawgit.com/navarrra/weatherBox/master/backgrounds/partlycloudyback.jpg')");
                break;
            case 'scatteredclouds':
              console.log("1");    $(".searchResults").css("background-image", "url('https://rawgit.com/navarrra/weatherBox/master/backgrounds/scatteredback.jpg')");
                break;
            case 'mostlycloudy':
            case 'cloudy':
              console.log("1");    $(".searchResults").css("background-image", "url('https://rawgit.com/navarrra/weatherBox/master/backgrounds/cloudyback.jpg')");
                break;
            case 'sleet':
            case 'rain':
              console.log("1");    $(".searchResults").css("background-image", "url('https://rawgit.com/navarrra/weatherBox/master/backgrounds/rainback.jpg')");
                break;
            case 'tstorms':
              console.log("1");    $(".searchResults").css("background-image", "url('https://rawgit.com/navarrra/weatherBox/master/backgrounds/tstormsback.jpg')");
                break;
            case 'snow':
            case 'flurries':
              console.log("1");    $(".searchResults").css("background-image", "url('https://rawgit.com/navarrra/weatherBox/master/backgrounds/snowback.jpg')");
                break;
            case 'fog':
            case 'hazy':
              console.log("1");    $(".searchResults").css("background-image", "url('https://rawgit.com/navarrra/weatherBox/master/backgrounds/fogback.jpg')");
                break;
            default:$(".searchResults").css("background-image", "url('https://rawgit.com/navarrra/weatherBox/master/backgrounds/fogback.jpg')");
            console.log('2');

        };//end of switch state


        //hide welcome page after search
        $(".welcomepage").hide();

        //show results after search
        $(".searchResults").removeClass("hideSearchresults");


        //data displayed from object results for city and current temp
         cityName.innerHTML = data.current_observation.display_location.full;

          //loop through weather array
        $.each(data.current_observation, function(i){
            $.each(description, function(j){
                if(description[j]==[i]){
                    document.getElementById(description[j]).innerHTML = data.current_observation[i];
                    if(description[j]=="icon_url"){
                      var icon = data.current_observation.icon_url;
                      //append icon
                      console.log(data.current_observation.icon_url);
                      $("#icon_url").prepend("<img src='" + icon + "'>" );
                    };
                };
            });
          });//end of loop

            //started 5 day forcast api call
              var threebtn = "off";
              $(".three_day").click(function(){
                   $("#current").animate({"left": "-100%"}).fadeOut(10);
                   console.log("all good");
                  $("#current").val("off");
                    if( threebtn !=="on"){

                $.ajax({
                  url: weatherCity + apiKey + forecast + city,
                  success: function(data){
                    console.log(data);
                    var forecastDate= data.forecast.simpleforecast.forecastday;

                    var forecast = [forecastDate];


                    for(var i = 0 ; i < forecast.length; i++){
                         console.log(forecast[i]);
                        var threeDay = forecast[i];

                         for(var j = 1 ; j < threeDay.length; j++){
                         var days = threeDay[j].date.weekday_short;
                         var icon = threeDay[j].icon_url;
                         var high = "<h3> High: " +  threeDay[j].high.fahrenheit + "°" + "</h3><br>";
                         var low = "<h3> low: " +  threeDay[j].low.fahrenheit + "°" + "</h3>";

                         $("#weekday_short").append("<div class='result3Day'><h3>"+ days + "</h3><br><img class='icon_url3' src='"+ icon +"'>" + high + low + "</div>");

                                };
                              };
                          },
                        });

                        };
                        threebtn = "on";
                      });
                }, //end of success
              });//end of ajax

}; //end of getWeather function

  });
