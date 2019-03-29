

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }

  });
});




// When player clicks the card they want to play, it disappears from the DOM.

$(document).ready(function() {
  $('container.cards img').click(function(){
    // $(this).css('display', 'none');
    // console.log(typeof Number($(this)[0].id));
    console.log("test ",$(this).attr('id'));
    // $('div.bid-card').css({ 'src': '$(this)[0].src', 'width': '$(this)[0].width', 'height': '$(this)[0].height' } );
    
    $('div.bid-card').append($(this));
    $(this).css( { 'margin': 'auto', 'display': 'block' } );
    //({ 'src': '$(this)[0].src', 'width': '$(this)[0].width', 'height': '$(this)[0].height' } );
    
    //$(this).css({'width':'500px'});
  });

  // $('img').click(function() {
  //   $(this).css('display', 'none');
  // });
});

// app.post("/lock", (req, res) => {
//   knex('cards').insert(
//    {card_value: Number($(this)[0].id)}
//   )
//   .asCallback((err) => {
//     res.redirect("/games/:gameid");
//     if (err) {
//       console.log(err);
//     }
//   })
// })