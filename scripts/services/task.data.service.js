SU.service("taskDataService", function($http) {

    this.getComments = function(task) {
        if (!task || !_.isPlainObject(task)) {
            throw new Error('getComments requires task as an object in taskDataService');
        }
        return _.reduce(task.assignees, function(prev, item) {
            if (item.rating && item.rating.comment) prev.push(item.rating.comment);
            return prev;
        }, []);
    };

    this.getRatings = function(task) {
        if (!task || !_.isPlainObject(task)) {
            throw new Error('getComments requires task as an object in taskDataService');
        }
        return _.reduce(task.assignees, function(prev, item) {
            if (item.rating && item.rating.score) prev.push(item.rating.score);
            return prev;
        }, []);
    };
});