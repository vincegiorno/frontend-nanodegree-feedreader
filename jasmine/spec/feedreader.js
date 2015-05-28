$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            // The allFeeds array is defined and has at least one element
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('have URLs defined', function() {
            // Each feed has a URL that is a non-empty string
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].url).toBeDefined();
                expect(typeof allFeeds[i].url).toBe('string');
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        it('have names defined', function() {
            // Each feed has a name that is a non-empty string
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].name).toBeDefined();
                expect(typeof allFeeds[i].name).toBe('string');
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    describe('The menu', function() {
        var menuIcon = $('.menu-icon-link');

        /* The menu is hidden or visible based on whether or not the body element
        has the class 'menu-hidden'. So test for the presence of this class. */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        it('shows if the menu icon is clicked', function() {
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
        });
        it('is hidden if the menu icon is clicked again', function() {
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {

        /* Mock the setup call to loadFeed(0) using the optional callback parameter
        to pass Jasmine's done() function for async testing. Then test for the
        presence of article entries. */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('exist after loadFeed is called', function(done) {
            expect($('.feed').find('article.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {

        /* The chained async calls take longer than the default Jasmine timeout
        interval, so reset the interval but store the original value to restore
        it in the afterEach block. Test for whether the feed title and title of
        the first article entry change. */
        var oldFeedName, oldArticle;
        beforeEach(function(done) {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            loadFeed(0, function() {
                oldFeedName = $('.header-title').text();
                oldArticle = $('article.entry h2').text();
                loadFeed(1, done);
            });
        });

        it('changes the page content', function(done) {
            expect($('.header-title').text()).not.toBe(oldFeedName);
            expect($('article.entry h2').text()).not.toBe(oldArticle);
            done();
        });

        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });

    describe('Delete Feed', function() {

        /* Load the index 0 feed so it can be deleted, forcing a reload,
        in order to test both aspects of the functionality. */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Parameters can't be passed in the onclick callback reference, so
        mock the async call with a setTimeout. The length should decrease by one,
        the title of the loaded feed should be the name of the new index 0 feed and
        the name of the deleted feed should not be found among the array element names. */
        it('deletes a feed and reloads if necessary', function(done) {
            var oldFeedName = allFeeds[0].name;
            var oldLength = allFeeds.length;
            $('li a').eq(0).next('button').click();
            setTimeout(function(done) {
                expect(allFeeds.length).toEqual(oldLength - 1);
                expect($('.header-title').text()).toBe(allFeeds[0].name);
                for (var i = allFeeds.length - 1; i >= 0; i--) {
                    expect(allFeeds[i].name).not.toBe(oldFeedName);
                }
                done();
            }, 1000);
        });
    });

    describe('Add Feed', function() {

        /* addFeed is modeled on loadFeed, so the optional callback can be used for
        the done() function. Test to see that the new feed data has been stored in
        allFeeds, that the title of the displayed feed is the name of the new feed
        and articles have been loaded. The length of allFeeds before the new feed
        is added will be the same as the index of the new feed. */
        var newFeed = 'NewFeed';
        var newUrl = 'Url';
        var newLength = allFeeds.length;
        beforeEach(function(done) {
            addFeed(newFeed, newUrl, done);
        });

        it('adds data for the new feed to allFeeds', function(done) {
            expect(allFeeds[newLength].name).toBe(newFeed);
            expect(allFeeds[newLength].url).toBe(newUrl);
            done();
        });

        it('loads the new feed', function() {
            expect($('.header-title').text()).toBe(newFeed);
            expect($('.feed').find('article.entry').length).toBeGreaterThan(0);
            done();
        });
    });

}());