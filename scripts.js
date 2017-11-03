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


});

var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://pokeapi.co/api/v2/";

xhr.open(method, url, true);
xhr.onreadystatechange = function () {
  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    console.log("ready");
  }
};
xhr.send();
