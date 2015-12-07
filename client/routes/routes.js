/* global FlowRouter */
/* global BlazeLayout */
FlowRouter.route('/', {
    name: 'home',
    action: function () {
        BlazeLayout.render("main", { content: "explore" });
    }
});

FlowRouter.route('/user/:username', {
    name: 'profile',
    action: function () {
        BlazeLayout.render("main", { content: "explore" });
    }
});

FlowRouter.route('/explore', {
    name: 'explore',
    action: function () {
        BlazeLayout.render("main", { content: "explore" });
    }
});

FlowRouter.route('/me', {
    name: 'me',
    action: function () {
        BlazeLayout.render("main", { content: "explore" });
    }
});

FlowRouter.route('/timeline', {
    name: 'timeline',
    action: function () {
        BlazeLayout.render("main", { content: "explore" });
    }
});

FlowRouter.route('/upload', {
    name: 'upload',
    action: function () {
        BlazeLayout.render("main", { content: "upload" });
    }
});

FlowRouter.notFound = {
    action: function() {
        FlowRouter.go('home');
    }
};