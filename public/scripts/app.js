

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





$(document).ready(function () {
  $('#lock-bid').click(function () {
    let cardId = $('div.bid-card').find('img').attr('id');
    const parameters = { cardId: cardId }
    $.post('/lock', parameters, function () {
    })
  });
  
  // When player clicks the card they want to play, it disappears from the DOM.
  $('container.cards div').click(function () {
    // console.log("test ", $(this).attr('id'));
    if ($('.bid-card').children().length > 0) {
      $('container.cards').append($('.bid-card div'));
      console.log('testing');
      console.log($('.bid-card').children());
    } 
      console.log($('div.bid-card').firstChild);
      $('div.bid-card').append($(this));
      // $(this).css({ 'margin': 'auto', 'display': 'block', 'width': '100px' });
    //({ 'src': '$(this)[0].src', 'width': '$(this)[0].width', 'height': '$(this)[0].height' } );

    //$(this).css({'width':'500px'});
  });



  // $('img').click(function() {
  //   $(this).css('display', 'none');
  // });
});

