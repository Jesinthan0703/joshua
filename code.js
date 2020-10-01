var ajax = new XMLHttpRequest();
var method = "POST";
var url = "https://elevate-be-staging.azurewebsites.net/instafeed.php";

ajax.open(method, url);

caption_array = [];
image_array = [];
likes_array = [];

ajax.onload = () => {
  var the_data = JSON.parse(ajax.responseText);
  console.log(the_data);
  var pro_pic = the_data.graphql.user.profile_pic_url_hd;
  var ourData = the_data.graphql.user.edge_owner_to_timeline_media.edges;
  console.log(ourData);

  //caption_array.push(ourData[i].node.edge_media_to_caption.edges[0].node);
  //ourData[i].node.display_url

  for (var i in ourData) {
    var images = ourData[i].node.display_url;
    var img =
      '<div class="cards__card justify-content-center align-items-center d-flex"> <img class="imgsize p-6" src="' +
      images +
      '" alt="Image" /></div>';
    image_array.push(img);
  }
  count = image_array.length;
  for (i = 0; i < count; i++) {
    document.getElementById("feed-holder").innerHTML += image_array[i];
  }
};

ajax.send();
