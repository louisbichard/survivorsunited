SU.controller('dashboardController', function($scope, apiService, notifyService, userDataService) {

    // INTRO JS 
    // ABSTRACT OUT INTO SERVICE
    $scope.IntroOptions = {
        steps: [{
            element: '#intro-dashboard',
            intro: "This is the dashboard, here you will find pending tasks that you need to comlete and review previously completed tasks.",
            position: 'right'
        }, {
            element: '#intro-mentor',
            intro: "On the mentor page you can find contact details for your mentor and send them instant messages",
            position: 'right'
        }, {
            element: '#intro-account',
            intro: "On the account page you can edit your personal details",
            position: 'right'
        }],
        showStepNumbers: false,
        showBullets: true,
        exitOnOverlayClick: true,
        exitOnEsc: true,
        doneLabel: 'Thanks'
    };

    apiService.get('/process/assigned_to_me')
        .then(function(result) {
            $scope.processes = result;
        });

    $scope.processActions = {
        markAsComplete: function(){
            console.log('mark task as complete');
        }
    };

});