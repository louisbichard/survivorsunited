SU.service("userDataService", function($http) {

    var that = this;

    this.countMissingMentors = function(users) {
        if (!users || !_.isArray(users)) {
            throw new Error('Incorrect parameters passed to countMissingMentors in usersDataService');
        }
        return _.reduce(users, function(prev, user) {
            if (!user.mentor) {
                prev++;
            }
            return prev;
        }, 0);
    };

    this.countRole = function(role, users) {
        if (!role || !users) {
            throw new Error('No role or users passed to countRole function');
        }
        return _.filter(users, function(user) {
                return user.role === role;
            })
            .length;
    };

    this.countStatus = function(tasks, status, user) {
        // TODO: SOME TYPE CHECKING
        return _.filter(tasks, function(task) {
                // ENSURE THAT RELEVANT PROPERTIES EXIST, TO PREVENT ERRORS
                if (!task || !task.assignees || !task.assignees[user._id] || !task.assignees[user._id].status) return false;
                return task.assignees[user._id].status === status;
            })
            .length;
    };
});