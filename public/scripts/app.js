

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});




// When player clicks the card they want to play, it disappears from the DOM.

$(document).ready(function () {
  $('#lock-bid').click(function () {
    let cardId = $('div.bid-card').find('img').attr('id');
    const parameters = { cardId: cardId }
    $.post('/lock', parameters, function () {
    })
  });

  $('container.cards img').click(function () {
    console.log("test ", $(this).attr('id'));

    $('div.bid-card').append($(this));
    $(this).css({ 'margin': 'auto', 'display': 'block' });
    //({ 'src': '$(this)[0].src', 'width': '$(this)[0].width', 'height': '$(this)[0].height' } );

    //$(this).css({'width':'500px'});
  });



  // $('img').click(function() {
  //   $(this).css('display', 'none');
  // });
});

