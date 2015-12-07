Template.single.helpers({
	createdAtTime: function(createdAt) {
		return moment(createdAt).from(TimeSync.serverTime());
	}
});