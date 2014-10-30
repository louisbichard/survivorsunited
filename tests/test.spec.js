describe('Chart service', function() {
    var MainCtrl, scope;

    beforeEach(module('SU', ['ngRoute', 'angularCharts', 'ui.calendar']));

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.new();
        MainCtrl = $controller('mainController', {
            $scope: scope
        });
    }));

    it('should be true', function() {
        //console.log(scope);
        expect(true).toBe(true);
    });

});