Template.explore.helpers({
	images: function () {
		return Images.find({});
	},
	moreResults: function () {
		return !(Images.find().count() < Session.get("itemsLimit"));
	},
	getAvatarUrl: function (userId) {
		var options = {
			secure: true,
			size: 64
		};
		var userEmail = Meteor.users.findOne(userId).emails[0].address;
		var url = Gravatar.imageUrl(userEmail, options);
		return url;
	},
	createdAtTime: function (createdAt) {
		return moment(createdAt).from(TimeSync.serverTime());
	},
	usersOwn: function (userId) {
		if (Meteor.userId() === userId) {
			return true;
		} else {
			return false;
		}
	}
});

Template.explore.onCreated(function () {
	var instance = this;
	Session.setDefault('itemsLimit', ITEMS_INCREMENT);
	instance.autorun(function () {
		instance.subscribe('images', Session.get('itemsLimit'));
	});
});

function showMoreVisible() {
	var threshold, target = $("#showMoreResults");
	if (!target.length) return;

	threshold = $(window).scrollTop() + $(window).height() - target.height() + 50;

	if (target.offset().top < threshold) {
		if (!target.data("visible")) {
			target.data("visible", true);
			incrementLimit(20);
		}
	} else {
		if (target.data("visible")) {
			target.data("visible", false);
		}
	}
}

// run the above func every time the user scrolls
$(window).scroll(showMoreVisible);

incrementLimit = function (inc) {
	inc = inc || 20;
	newLimit = Session.get('itemsLimit') + inc;
	Session.set('itemsLimit', newLimit);
};