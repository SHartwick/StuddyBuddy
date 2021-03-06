// module for cards
var Cards = require('./card_manager.js');
var ScoreKeeper = require('./score_keeper.js');

function random(ceiling){
  return Math.floor(Math.random()*ceiling);
}

var first_question = true;


// canned response functions, self-explanatory by their titles
// later, we can replace these with arrays so it's less repetitive
exports.Responses = {
  correct : function(ans){
    return inQuotes( ans )
      + " " + random_response('correct')
      + " " + random_response('encouragement')
      + " " + random_response('forward');
  },
  incorrect_try_again : function (ans){
    return inQuotes( ans )
      + " " + random_response('incorrect')
      + " " + random_response('try_again');
  },
  give_options : function (){
    return random_response('options');
  },
  give_options_asked : function (){
    return random_response('options_2');
  },
  incorrect_give_answer : function (ans){
    return random_response('acknowledge')
      + " " + random_response('give_answer')
      + " " + inQuotes( Cards.getCurrentAnswer()[0] ) + "."
      + " " + random_response('forward');
  },
  new_card : function(){
    Cards.goToNextCard();
    var response = "";
    if( first_question ){
      response = "If you\'d like to know what I can do for you while studying, just ask! ";
      first_question = false;
    }
    response += random_response('ask_answer')
      + " " + inQuotes( Cards.getCurrentQuestion() );
    return response;
  },
  ask_deck : function(){
    return "What deck would you like to study? I recommend studying " + Cards.getDeckSuggestion();
  },
  list_deck : function(){
    return random_response('acknowledge') + " The available decks are: " + Cards.getDecks() + ". What would you like to study?";
  },
  welcome : function(){
    return random_response('welcome');
  },
  good_job : function(){
    return random_response('encouragement');
  },



  getStats : function(deckName){

    let scoreRes = ScoreKeeper.getCorrectCount(deckName);
    let totalRes = ScoreKeeper.getTotalCount(deckName);
    let stickerName = Cards.getStickerName(deckName);
    let err = ""

    if(stickerName == null){
      stickerName = Cards.getCurrentSticker();
      err = "I'm not sure I give out those kinds of stickers, but ";
    }

    return err + "You have earned " + scoreRes + " " + stickerName + " stickers.";
  },

  skip : function(switchD){

    let switchDeck = " "

      if(switchD){
        switchDeck = " It looks like we reached the end of the deck, just let me know if you want to switch to another one, for now we'll go through again! "
      }

    var resp = random_response('acknowledge')
      + " " + random_response('skip')
      + " " + random_response('give_answer')
      + " " + inQuotes( Cards.getCurrentAnswer()[0] ) + ".";
    Cards.goToNextCard();
    return resp
      + switchDeck + random_response('ask_answer')
      + " " + inQuotes( Cards.getCurrentQuestion() );
  },

  hint : function(){
    var hint_found = Cards.getCurrentHint()

    // if there's no hint
    if (!hint_found){
      return random_response('no_hint')
        + " " + random_response('repeat')
        + " " + inQuotes( Cards.getCurrentQuestion() );
    }

    // if there was a hint, but it's been used
    else if (hint_found == 'used'){
      return random_response('hint_used')
        + " " + random_response('repeat')
        + " " + inQuotes( Cards.getCurrentQuestion() );
    }

    // if there's a hint
    else {
      return random_response('hint')
        + " " + inQuotes( hint_found ) + "."
        + " " + random_response('re_ask');
    }
  },

  exit : function(){
    return "Thanks for studying with us! Have a great day!";
  },

  repeat : function(){
    return random_response('repeat')
      + " " + inQuotes( Cards.getCurrentQuestion() ) + ".";
  },

  acknowledge : function(){
    return random_response('acknowledge');
  },

  oops : function(){
    return random_response('misunderstood');
  }

}

var helpers = {
  encouragement: [
    'Right on!',
    'Great job!',
    'Great!',
    'Wonderful!',
    'Woohoo!',
    'You\'re doing great!',
    'Awesome job!'
  ],
  correct: [
    'is just right.',
    'is correct!',
    'is exactly right.',
    'is spot on!'
  ],
  forward: [
    'Moving on ...',
    'Let\'s keep going!',
    'Onward!',
    'Now for the next one.'
  ],
  incorrect: [
    'is not quite right.',
    'is a little off.'
  ],
  try_again: [
    'Let\'s give it another go.',
    'Go ahead and give it another shot.',
    'Why don\'t you try again.'
  ],
  acknowledge: [
    'Okay!',
    'Alright then.',
    'Alright, champ.'
  ],
  give_answer: [
    'Here\'s the right answer: ',
    'Here\'s the correct answer: ',
    'The right answer is: ',
    'The correct answer is: '
  ],
  repeat: [
    'Here\'s the question again:',
    'I\'ll repeat the question for you:'
  ],
  ask_answer: [
    'Answer this: ',
    'Give me your answer to this: ',
    'Here\'s your question: '
  ],
  welcome: [
    'Welcome to Study Buddy! Let\'s go!',
    'Hi there! Let\'s get learning!'
  ],
  skip: [
    'We\'ll skip that one.',
    'We\'ll move past that one.',
    'We can skip it.'
  ],
  hint: [
    'Here\'s a hint:',
    'Maybe this will help:'
  ],
  re_ask: [
    'What do you think the answer is?',
    'What do you think the answer is now?'
  ],
  no_hint: [
    'Oh no! It looks like I can\'t help you with this one.',
    'Drat, I don\'t have a hint for this one.',
    'Darn! I want to help you, but I don\'t have a hint for this question.'
  ],
  options: [
    'Don\'t forget, you can ask me for a hint, to skip a card, to repeat a card, or to say your score at any time.',
    'Just let me know if you want me to give you a hint, to move on, to repeat the question, or to give you your score.',
    'Whenever you need a hint, a repeat, a reminder of your score, or you want to move on, just tell me!',
    'Feel free to ask me for a hint, to repeat the question, to skip a question, or to tell you your score whenever you like.'
  ],
  options_2: [
    'I can give you a hint, skip a card, repeat a card, or say your score at any time. Just ask! What would you like to do now?',
    'Some things I can do for you are give a hint, skip a card, repeat a card, and give you your score. Just let me know! What would you like to do now?'
  ],
  misunderstood: [
    'Sorry, I didn\'t understand that.',
    'Hmm, I\'m not understanding you.',
    'Uh-oh! I don\'t know how to deal with what you said!',
    'Oops! I don\'t know what to do now. My bad!'
  ],
  hint_used: [
    'Looks like I have no more hints for you on this one! Bummer.',
    'I don\'t have another hint for this, Darn!',
    'I can\'t give you any more help then I already have, buddy.'
  ],

}

function random_response(key){
  list = helpers[key];
  ceil = list.length;
  rand = Math.floor( Math.random() * ceil);
  return list[rand];
}

function inQuotes(string){
  return "\'"+string+"\'";
}
