var random_user = new Date().getTime();
var res = {}

describe("Register", function() {

    it("Should allow unique user", function(done) {
        var req = {
            body: {
                username: "username" + random_user,
                password: "password"
            }
        };
        require('../auth/register.js')(res, req).then(function(data) {
            expect(data.success).toBe(true);
            done();
        });
    });

    it("Shouldn't allow non unique user", function(done) {
        var req = {
            body: {
                username: "username" + random_user,
                password: "password"
            }
        };
        require('../auth/register.js')(res, req).then(function(data) {
            expect(data.success).toBe(false);
            done();
        });
    });

    it("Shouldn't allow short password", function(done) {
        var req = {
            body: {
                username: "username" + random_user,
                password: "pass"
            }
        };
        require('../auth/register.js')(res, req)
            .caught(function(err) {
                expect(err.success).toBe(false);
                done();
            });
    });

    it("Shouldn't allow missing user", function(done) {
        var req = {
            body: {
                password: "password"
            }
        };
        require('../auth/register.js')(res, req)
            .caught(function(err) {

                expect(err.success).toBe(false);
                done();
            });
    });

    it("Shouldn't allow missing password", function(done) {
        var req = {
            body: {
                username: "username" + random_user
            }
        };
        require('../auth/register.js')(res, req)
            .caught(function(err) {
                expect(err.success).toBe(false);
                done();
            });
    });

});