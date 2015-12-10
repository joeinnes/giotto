/* global $ */
/* global Bert */
/* global Images */
/* global IR */
/* global Meteor */
/* global FS */
/* global Session */
/* global Template */
Template.upload.helpers({
  'previewingFile': function () {
    if (Session.get('previewing') === true) {
      return true;
    } else {
      return false;
    }
  },
  'filters': function () {
    if (typeof Session.get('filters') != 'undefined') {
      return Session.get('filters').toString().replace(/,/, ' ');
    } else {
      return '';
    }
  },
  'processing': function () {
    return Session.get('processing');
  }
});

Template.upload.events({
  'change .fileSelect': function (event, template) {
    Session.set('previewing', true);
    Session.set('processing', true);
    FS.Utility.eachFile(event, function (file) {
      if (!file.type.match(/image.*/)) {
        console.log('This isn\'t a picture');
        throw new Meteor.Error('not-a-picture');
        Session.set('previewing', false)
      }
      if (!!file) {
        var renderedImg = document.getElementById('previewImage');
        var newImg = processImage(file, 1024, 1024, function (data) {
          //var img;
          //img = new FS.File(data);
          //renderedImg.src = img.src;
          console.log('callback fired');
          renderedImg.src = data;
          Session.set('processing', false);
        });
      }
    });
  },
  'submit .uploadFile': function (event, template) {
    event.preventDefault();
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-logged-in')
    }
    var img = document.getElementById("previewImage");
    var dataurl = img.src;
    var caption = document.getElementById("caption").value;
    var toInsert = new FS.File(dataurl);
    toInsert.metadata = {
      caption: caption,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      createdAt: new Date(),
      filters: Session.get('filters')
    };

    Images.insert(toInsert, function (err, fileObj) {
      if (!err) {
        Bert.alert('Nice! Uploaded your image', 'success', 'growl-top-right');
        Session.set('previewing', false);
        Session.set('processing', false);
        Session.set('filters', []);
        FlowRouter.go('home');
      } else {
        Bert.alert({
          title: 'Couldn\'t upload',
          message: 'The error was ' + err,
          type: 'danger',
          style: 'growl-top-right',

        });
      }
    });
  },
  'click .addFilter': function (event) {
    var filterToApply = 'ig-' + event.target.id;
    var currentFilters = Session.get('filters') || [];
    if ($.inArray(filterToApply, currentFilters) != -1) {
      currentFilters.splice($.inArray(filterToApply, currentFilters), 1);
    } else {
      currentFilters.push(filterToApply);
    }
    Session.set('filters', currentFilters);
  },
  'click .reset': function (event) {
    Session.set('filters', []);
  }
});

Template.upload.onCreated(function () {
  Session.setDefault('previewing', false);
});