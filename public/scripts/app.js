
  let cardsArr = ['images/1hearts.jpg', 'images/2hearts.jpg', 'images/3hearts.jpg', 'images/4hearts.jpg', 'images/5hearts.jpg', 'images/6hearts.jpg', 'images/7hearts.jpg', 'images/8hearts.jpg', 'images/9hearts.jpg', 'images/10hearts.jpg', 'images/11hearts.jpg', 'images/12hearts.jpg', 'images/13hearts.jpg'];
  let score = 0;
  let compScore = 0;
  let bidCardId;
  let roundNumber = 1;
  let ourBid;
  let playerScore = 0;
  let compFinal = 0;
  let cardIndex = [0, 9, 12, 4, 1, 10, 7, 6, 5, 2, 3, 8];
  let index = 1;

$(document).ready(function () {
  $('#lock-bid').click(function () {
    let cardId = $('.prize').find('img').attr('id');
    let numberScore = parseInt(cardId, 10)
    roundNumber ++;
    if(roundNumber > 13 && playerScore > compFinal){
      $('.roundNum').text('GAME OVER');
      $('#player-score').text('YOU WIN');
      alert('GAME OVER. You win. Press new game to start again.')
    } else if(roundNumber > 13 && compFinal > playerScore){
      $('#comp-score').text('WINNER');
      $('.roundNum').text('GAME OVER');
      alert('GAME OVER. You lose. Press new game to start over.')
    } else if(ourBid === numberScore){
      alert('Its a TIE!!');
      $('.bid-card').css('display', 'none');
      $("#" + cardId).attr('src',cardsArr[cardIndex[index]]);
      $("#" + cardId).attr('id', cardIndex[index] + 1);
      index ++;
      $('#' + bidCardId).css('display', 'none');
      $('.roundNum').text('Round Number: ' + roundNumber);
      $('.textInfo').css('display', 'inline');
    } else if (ourBid > numberScore){
      alert('You win this round!!');
      score += numberScore;
      $('.bid-card').css('display', 'none');
      $("#" + cardId).attr('src',cardsArr[cardIndex[index]]);
      $("#" + cardId).attr('id', cardIndex[index] + 1);
      index ++;
      $('#' + bidCardId).css('display', 'none');
      $('.roundNum').text('Round Number: ' + roundNumber);
      $('.textInfo').css('display', 'inline');
      $('#player-score').text('YOUR SCORE: ' + score.toString());
      playerScore += score;
    } else {
      alert('You lose this round!!');
      compScore += numberScore;
      compFinal += numberScore;
      $('#comp-score').text('OPPONENT SCORE: ' + compScore.toString());
      $('.bid-card').css('display', 'none');
      $("#" + cardId).attr('src',cardsArr[cardIndex[index]]);
      $("#" + cardId).attr('id', cardIndex[index] + 1);
      $('#' + bidCardId).css('display', 'none');
      index ++;
      $('.roundNum').text('Round Number: ' + roundNumber);
      $('.textInfo').css('display', 'inline');
    }

  });

  // When player clicks the card they want to play, it disappears from the DOM.
  $('.bidding').click(function () {
      $(this).addClass("highlight");
      let Id = $(this).attr('id');
      bidCardId = parseInt(Id, 10);
      ourBid = bidCardId;
      $('.textInfo').css('display', 'none');
    });

    $('#new-game').click(function() {
      location.reload();
  });
});



