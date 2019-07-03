/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   File:   calendar-button.js
*/

var DatePicker = DatePicker || {};

var CalendarButtonInput = function (inputNode, buttonNode, datepicker) {
  this.inputNode    = inputNode;
  this.buttonNode   = buttonNode;
  this.imageNode    = false;

  this.datepicker = datepicker;

  this.keyCode = Object.freeze({
    'TAB': 9,
    'ENTER': 13,
    'ESC': 27,
    'SPACE': 32,
    'PAGEUP': 33,
    'PAGEDOWN': 34,
    'END': 35,
    'HOME': 36,
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40
  });
};

CalendarButtonInput.prototype.init = function () {
  this.buttonNode.addEventListener('click', this.handleClick.bind(this));
  this.buttonNode.addEventListener('keydown', this.handleKeyDown.bind(this));
};

CalendarButtonInput.prototype.handleKeyDown = function (event) {
  var flag = false;

  switch (event.keyCode) {

    case this.keyCode.SPACE:
    case this.keyCode.ENTER:
      this.datepicker.show();
      this.datepicker.setFocusDay();
      flag = true;
      break;

    case this.keyCode.ESC:
      this.datepicker.hide(false);
      flag = true;
      break;

    default:
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

CalendarButtonInput.prototype.handleClick = function () {
  if (this.isCollapsed()) {
    this.datepicker.show();
    this.datepicker.setFocusDay();
  }
  else {
    this.datepicker.hide();
  }

  event.stopPropagation();
  event.preventDefault();

};

CalendarButtonInput.prototype.setLabel = function (str) {
  this.buttonNode.setAttribute('aria-label', 'Calendar, ' + str);
};

CalendarButtonInput.prototype.setFocus = function () {
  this.setLabel('selected date is ' + this.datepicker.getDateForButtonLabel());
  this.buttonNode.focus();
};

CalendarButtonInput.prototype.setAriaExpanded = function (flag) {
  if (flag) {
    this.buttonNode.setAttribute('aria-expanded', 'true');
  }
  else {
    this.buttonNode.setAttribute('aria-expanded', 'false');
  }
};

CalendarButtonInput.prototype.getAriaExpanded = function () {
  return this.buttonNode.getAttribute('aria-expanded') === 'true';
};

CalendarButtonInput.prototype.isCollapsed = function () {
  return this.inputNode.getAttribute('aria-expanded') !== 'true';
};

CalendarButtonInput.prototype.setDate = function (month, day, year) {
  this.inputNode.value = (month + 1) + '/' + (day + 1) + '/' + year;
};

CalendarButtonInput.prototype.getDate = function () {
  return this.inputNode.value;
};

CalendarButtonInput.prototype.hasFocus = function () {
  return this.hasFocusflag;
};

// Initialize menu button date picker

window.addEventListener('load' , function () {

  var datePickers = document.querySelectorAll('.datepicker');

  datePickers.forEach(function (dp) {
    var inputNode   = dp.querySelector('input');
    var buttonNode  = dp.querySelector('button');
    var dialogNode  = dp.querySelector('[role=dialog]');

    var datePicker = new DatePicker(inputNode, buttonNode, dialogNode);
    datePicker.init();
  });

});

