Meteor.methods({
	'insertImage': function (data) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-logged-in')
		}

		data.metadata.owner = Meteor.userId();
		data.metadata.username = Meteor.user().username;
		data.metadata.createdAt = new Date;
		
		Images.insert(data);
	}
})