import $ from 'jquery';

require('webpack-jquery-ui');
import '../css/styles.css';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function() {
  "use strict"; // https://lucybain.com/blog/2014/js-use-strict/

  // Referens internt i modulen för DOM element
  let DOM = {};

  /* =================== Privata metoder nedan ================= */
  function captureDOMEls() {
    DOM.$board = $('.board');
    DOM.$listDialog = $('#list-creation-dialog');
    DOM.$columns = $('.column');
    DOM.$lists = $('.list');
    DOM.$cards = $('.card');
    
    DOM.$newListButton = $('button#new-list');
    DOM.$deleteListButton = $('.list-header > button.delete');

    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.card > button.delete');
  }

  function createTabs() {}
  function createDialogs() {}

  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  */
  function bindEvents() {
    DOM.$newListButton.on('click', createList);
    DOM.$deleteListButton.on('click', deleteList);

    DOM.$newCardForm.on('submit', createCard);
    DOM.$deleteCardButton.on('click', deleteCard);
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    // event.preventDefault();
    console.log("This should create a new list");
    $('#list-creation-dialog').dialog();
    // $('#datepicker').datepicker();

    let newList = $('#list-creation-dialog').find('input').val();
    // let dateList = $('#list-creation-dialog').find('datepicker').val();
    console.log(newList);

    

  }

  function deleteList() {
    console.log("This should delete the list you clicked on");

    $(this).parent().fadeOut(500, function () {
      $(this).parent().remove();
    })
  }



  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    event.preventDefault();
    console.log("This should create a new card");

    // let task = $('input').val();
    let task = $(this).find('input').val();
    console.log(task);
    
    let addedTask = $(this).closest(".add-new").before("<li class='card'>" + task + "<button class='button delete'>X</button></li>");

    $(this).parent().prev().find('button.delete').click(deleteCard);

    console.log(this);


  }


  function deleteCard() {
    console.log("This should delete the card you clicked on");

    // $('.card').on("click", "button", function (event) {
      $(this).parent().fadeOut(500, function () {
        $(this).remove('.list');
      })
    // })
    
  }

  //sortable

  $('.list-cards').sortable({
    connectWith: '.list-cards'
  })

  $('.column').sortable({
    connectWith: '.column'
  })



  // Metod för att rita ut element i DOM:en
  function render() {}

  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ::::');
    // Förslag på privata metoder
    captureDOMEls();
    createTabs();
    createDialogs();

    bindEvents();
  }

  // All kod här
  return {
    init: init
  };
})();

//usage
$("document").ready(function() {
  jtrello.init();
});
