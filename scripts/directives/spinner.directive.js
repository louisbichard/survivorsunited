SU.directive('spinner', function() {
        return {
            restrict: 'E',
            replace: true,
            template: "<div class='text-center'><img src='assets/img/spinner.gif'/></div>"
        };
    });
