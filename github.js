var GitHubApp = {

  init: function(){
    GitHubApp.submitButton();
    GitHubApp.keyPress();
  },

  submitButton: function(){
    $('#button').click(function(){
      GitHubApp.getAns();

      });

    },

    getAns: function(){
      $(".results").html("");
      $(".followers").html("");
      $(".repos").html("");
      $("#username").html("");
      var username = $('#show').val();
      $("#username").append(username);
      GitHubApp.apiRequest(username);
      GitHubApp.apiRequest1(username);
    
  },

  keyPress: function(){
    $("#show").keydown(function(e) {
       if (event.keyCode == 13) {
          //event.preventDefault();
          GitHubApp.getAns();
          
        }
    });
  },

  apiRequest: function(username){
    var url = "https://api.github.com/users/"+username;
     $.ajax({
      url: url,
      datatype: "jsonp",
      success: function(data,status){
          console.log(data);
          var test = data.avatar_url;
          var followers = data.followers;
          var following = data.following;
          var repos = data.public_repos;
          var organizations = data.organizations_url.length;
          //var reposList = data.repos;

          // To append the avartar to the div
          $('.results').append("<img src ="+test+" >");

          //To append the number of followers and repos
          $('.followers').append("<p>followers : "+followers+"</p>");
           $('.followers').append("<p>following : "+following+"</p>");
          $('.followers').append("<p> repos : "+repos+"</p>");
          $('.followers').append("<p>Organizations : "+organizations+"</p>");
          //$('.repos').append("<p>"+reposList+"</p>");
        }
    });
  },

  apiRequest1: function(username){
    var url = "https://api.github.com/users/"+username+"/repos";
     $.ajax({
      url: url,
      datatype: "jsonp",
      success: function(data,status){

        $.each(data, function(i){
          $('.repos').append("<a href="+data[i].html_url+"><button>"+data[i].name+"</button></a>");
        });
        
      }
    });

}

}

$(document).ready(function(){
  GitHubApp.init();
});

