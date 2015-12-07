/* global Template */
Template.upload.helpers({
  'previewingFile': function() {
    if (Session.get('previewing') === true) {
      return true;
    } else {
      return false;
    }
  },
  'processing': function() {
    if (Session.get('processing') === true) {
      return true;
    } else {
      return false;
    }
  },
});

Template.upload.events({
  'change .fileSelect': function (event, template) {
    Session.set('previewing', true)
    FS.Utility.eachFile(event, function (file) {
      if (!file.type.match(/image.*/)) {
        console.log('This isn\'t a picture');
        throw new Meteor.Error('not-a-picture');
        Session.set('previewing', false)
      }
      // Create an image
      var img = document.createElement("img");
      // Create a file reader
      var reader = new FileReader();
      // Set the image once loaded into file reader
      reader.onload = function (e) {
        img.src = e.target.result;

        var canvas = document.getElementById("previewImage");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var MAX_WIDTH = 500;
        var MAX_HEIGHT = 500;
        var width = img.width;
        var height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        Caman(canvas, function () {
          this.render();
        });
      }
      // Load files into file reader
      reader.readAsDataURL(file);
    });
  },
  'submit .uploadFile': function (event, template) {
    event.preventDefault();
    console.log('Yup, uploading');
    var canvas = document.getElementById("previewImage");
    var dataurl = canvas.toDataURL("image/jpeg", 0.85);

    /*Images.insert(dataurl, function (err, fileObj) {
      console.log('Inserted ' + fileObj._id);
      // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
    });*/
    Bert.alert('Nice! Uploaded your image', 'success', 'growl-top-right');
    console.log(dataurl);
  },
  'click .addFilter': function(event) {
    Session.set('processing', true);
    var filterToApply = event.target.id;
    Caman("#previewImage", function(strength) { 
      var strength = strength || 50;
      this[filterToApply](strength).render(function() {
        Session.set('processing', false);
       }); 
    });
  },
  'click .reset': function(event) {
    Caman("#previewImage", function() { this.reset(); });
  }
});

Template.upload.onCreated(function() {
  Session.setDefault('previewing', false);
  Session.setDefault('processing', false);
});