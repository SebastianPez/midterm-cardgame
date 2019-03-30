const samplePrizeDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const p1Deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const p2Deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

// Shuffles the positions of the cards in the prize deck so that each game has a different sequence of prize cards for the rounds.
const shuffleCards = function(deckArray) {
    for (let i = deckArray.length - 1; i >= 0; i --) {

        // Selects a random number within the range of the deck.
        let indexRandom = Math.floor(Math.random() * (i + 1));
        //  Then selects the number at that index position.
        let numAtIndex = deckArray[indexRandom];

        // Assigns random number in array to be equal to i.
        deckArray[indexRandom] = deckArray[i];
        // Then assigns i to be the previous random number, finishing the switch.
        deckArray[i] = numAtIndex;
    }
    return deckArray;
}

// console.log(shuffleCards(samplePrizeDeck));

const compareBids = function (p1Bid, p2Bid, prizeValue) {
    // If players have the same bid, then the round is a tie and all cards including prize card are discarded and next round begins.
    if (p1Bid === p2Bid) {
        console.log('Bids are equal, this round is a tie.');
        return;

    // If player 1 has a higher bid than player 2, player 1 wins round and receives points equal to the value of the prize card. Cards are then discarded and next round begins.
    } else if (p1Bid > p2Bid) {
        console.log('Player 1 wins');
        // Add prizeValue to player 1's score.
        return;

    // If player 1 has a lower bid than player 2, player 2 wins round and receives points equal to the value of the prize card. Cards are then discarded and next round begins.
    } else {
        console.log('Player 2 wins');
        // Add prizeValue to player 2's score.
        return;
    }
}
// compareBids(7, 7);
// compareBids(11, 9);
// compareBids(6, 13);

exports.cardGenerator = function (suit, match) {



}
