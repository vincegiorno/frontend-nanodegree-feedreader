/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('have URLs defined', function() {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].url).toBeDefined();
                expect(typeof allFeeds[i].url).toBe('string');
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        it('have names defined', function() {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].name).toBeDefined();
                expect(typeof allFeeds[i].name).toBe('string');
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    describe('The menu', function() {
        var menuIcon = $('.menu-icon-link');

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

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('exist after loadFeed is called', function(done) {
            expect($('.feed').find('article.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {

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

        beforeEach(function(done) {
            loadFeed(0, done);
        });

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

}());