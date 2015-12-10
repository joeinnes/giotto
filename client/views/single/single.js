Template.single.helpers({
	createdAtTime: function(createdAt) {
		return moment(createdAt).from(TimeSync.serverTime());
	},
	filters: function() {
		if (typeof this.metadata.filters != 'undefined') {
			return this.metadata.filters.toString().replace(/ /g, ' ');
		} else {
			return '';
		}
	}
});