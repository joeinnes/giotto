Meteor.publish('images', function(limit, query) {
  var selector = {};
  if (query) {
    selector = query;
  }
  return Images.find(selector, {limit: limit});
});

