Jasmine test suites for a feedreader

The test suites include tests for future functionality that would delete and add feeds. These 3 specs will fail when the index.html file is loaded, running the tests.

The delete feed functionality would be omplemented by adding a delete button to the right of each entry in the feeds menu. Clicking the button would delete the corresponding feed by using jQuery to find the data-id of the previous sibling <a> tag. This would be the allFeeds index of the feed, which would then be removed by splicing. If the deleted feed is the feed currently being displayed, the reader would load the index 0 feed, which would be a diffferent feed if the index 0 feed was the one deleted, as in the test suite.

The add feed functionality would more or less be loadFeed along with pushing a new object containing the new feed's name and url onto the allFeeds array.
