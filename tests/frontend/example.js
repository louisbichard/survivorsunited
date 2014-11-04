

describe('myApp', function() {
    var scope,
        controller;
    beforeEach(module('SU'));

    beforeEach(function() {
        module('ngRoute');
        module('angularCharts');
        module('ui.calendar');
    });

    /*describe('MyCtrl', function() {
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('mainController', {
                '$scope': scope
            });
        }));

        it('has test', function() {
            expect(scope.test).toBe('test');
        });

    });*/




    /*

    describe('CtrlHttp', function () {

        var $httpBackend,
            expectedUrl = '/someUrl?key1=value1',
            promise,
            successCallback,
            errorCallback,
            httpController;

        beforeEach(inject(function ($rootScope, $controller, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            scope = $rootScope.$new();
            successCallback = jasmine.createSpy();
            errorCallback = jasmine.createSpy();
            httpController = $controller('CtrlHttp', {
                '$scope': scope
            });
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('returns http requests successfully and resolves the promise', function () {
            var data = '{"translationKey":"translationValue"}';
            expect(httpController).toBeDefined();
            $httpBackend.expectGET(expectedUrl).respond(200, data);
            promise = scope.getHttp();
            promise.then(successCallback, errorCallback);

            $httpBackend.flush();

            expect(successCallback).toHaveBeenCalledWith(angular.fromJson(data));
            expect(errorCallback).not.toHaveBeenCalled();
        });

        it('returns http requests with an error and rejects the promise', function () {
            $httpBackend.expectGET(expectedUrl).respond(500, 'Oh no!!');
            promise = scope.getHttp();
            promise.then(successCallback, errorCallback);

            $httpBackend.flush();

            expect(successCallback).not.toHaveBeenCalled();
            expect(errorCallback).toHaveBeenCalled();
        });
    });*/

});



/*
describe('Chart service', function() {
    var MainCtrl, scope;

    beforeEach(function() {
        module('SU', ['ngRoute', 'angularCharts', 'ui.calendar']);
    });

    beforeEach(inject(function( $controller, $rootScope ) {
        scope = $rootScope.new();

        MainCtrl = $controller('mainController', {
            $scope: scope
        });
    }));



    it('should be true', function() {
        console.log(scope);
        expect(true).toBe(true);
    });

});




*/