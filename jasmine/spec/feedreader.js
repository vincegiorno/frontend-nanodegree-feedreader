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
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
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


    /* TODO: Write a new test suite named "Initial Entries" */

    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test wil require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());