var history = require("../");

describe('History', function() {
    it('should correctly trigger "change" event', function(done) {
        history.start();
        history.once('change', function(url) {
            expect(url).to.equal("hello/world");
            done();
        });
        window.location.hash = "/hello/world";
    });
});

describe('Router', function() {

    it('should correctly trigger route', function(done) {
        var router = new history.Router({
            routes: {
                "post/:id": function(postId) {
                    expect(postId).to.equal("hello-world");
                    done();
                }
            }
        });

        // Start handling history
        router.start();

        window.location.hash = "/post/hello-world";
    });

});

