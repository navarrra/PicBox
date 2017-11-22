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
      var description = ["description", "icon"];
      var highlow = ["temp" ,"humidity"];


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
