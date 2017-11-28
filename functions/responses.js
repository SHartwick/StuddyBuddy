// module for cards
var Cards = require('./card_manager.js');
var ScoreKeeper = require('./score_keeper.js');

// CONTEXTS
const ASSESS_CONTEXT = "assess";
const AGAIN_CONTEXT = "again";
const HINT_CONTEXT = "hint";
const SWITCH_CONTEXT = "switch";


// canned response functions, self-explanatory by their titles
// later, we can replace these with arrays so it's less repetitive
exports.Responses = {
  correct : function(ans){
    return "\'"+ans + "\' is correct! Moving on...";
  },
  incorrect_try_again : function (ans){
    return "\'"+ans + "\' is incorrect. Would you like to try again?";
  },
  incorrect_give_answer : function (ans){
    return "Okay. The correct answer is "+Cards.getCurrentAnswer()+".";
  },
  ask_answer : function(){
    return "Ok! Here's the question again: \'"+Cards.getCurrentQuestion()+"\'?";
  },
  new_card : function(){
    Cards.goToNextCard();
    return "Answer this: \'"+Cards.getCurrentQuestion()+"\'?";
  },
  select_deck : function(){
    return "What deck would you like to study? \'" + Cards.getDeckSuggestion();
  },
  list_deck : function(){
    return "Ok! Here are the decks you can study: " + Cards.getDecks();
  },
  welcome : function(){
    return "Welcome to Study Buddy! Let's go!";
  },
  ask_deck : function(){
    return "What deck would you like to study today?";
  },
  good_job : function(){
    return "You're doing great!";
  },

  getStats : function(deckName){

      let scoreRes = ScoreKeeper.getCorrectCount(deckName);
      let totalRes = ScoreKeeper.getTotalCount(deckName);

    return "You have answered " + scoreRes + " out of " + totalRes + " total questions in the " + deckName + " deck";
  },

  getBackTo : function(app){
    switch(app.getContext()){
      case ASSESS_CONTEXT:
          app.setContext(AGAIN_CONTEXT);
          return "Would you like to go back to your last card?";
      case AGAIN_CONTEXT:
          app.setContext(AGAIN_CONTEXT);
          return "Would you like to go back to your last card?";
      case HINT_CONTEXT:
          app.setContext(HINT_CONTEXT);
          return "So did you want to hear that hint?";
      case SWITCH_CONTEXT:
          app.setContext(SWITCH_CONTEXT);
          return "So what topic did you want to switch to?"
    }
    app.setContext(AGAIN_CONTEXT);
    return "Would you like to go back to your last card?";
  },

  skip : function(){
    var resp = "Okay, we'll skip '" + Cards.getCurrentQuestion()
      + "\' The answer is \'"+ Cards.getCurrentAnswer() + "\'";
    Cards.goToNextCard();
    return resp + " Here's a new one: \'"+Cards.getCurrentQuestion()+"\'";
  },

  hint : function(){
    if ( Cards.getCurrentHint() ) {
      return "Here's a hint! \'"+ Cards.getCurrentHint()+"\' What do you think is the answer?";
    } else {
      return "Sorry, I don't know any hints for this question! Here's the question again: \'"+ Cards.getCurrentQuestion()+"\'";
    }
  },

  exit : function(){
    return "Thanks for studying with us! Have a great day!";
  }

}
