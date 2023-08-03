$(function () {
    (async function () {
      try {
        let tableEle = document.getElementById("slider");
        let response = await fetch(
          "http://localhost:5050/ardswc/server/relatedLinks.php"
        );
        let body = await response.json();
        console.log(body);
  
  
        $.each(body, function (index, item) {
          /*console.log(item);
          console.log(index);*/

          if(item.LI_TYPE=='政府網站')
          {
            $("#related_link1").append(
                '<li><a href="'+item.LI_URL+'">'+item.LI_NAME+'</a></li>');
                console.log('1');
          }
          else(item.LI_TYPE=='遊戲')
          {
            $("#related_link2").append(
                '<li><a href="'+item.LI_URL+'">'+item.LI_NAME+'</a></li>');
                console.log('2');
          }

          
  
        });
        
  
      } catch (error) {
        console.log(error);
      }
    })();
  });
  