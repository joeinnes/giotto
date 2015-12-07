/* global Accounts */
Accounts.ui.config({
  requestPermissions: {},
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.subscribe('users');

Accounts.onLogin(function() {
  FlowRouter.go('home');
});

ITEMS_INCREMENT = 10;