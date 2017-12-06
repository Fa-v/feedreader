/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function () {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    describe('urls', function () {
      it('are defined and are not empty', function () {
        allFeeds.forEach((feed) => {
          expect(feed.url).toBeDefined();
          expect(feed.url).toBeTruthy();
        });
      });
    });

    /* Loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    describe('name', function () {
      it('is defined and is not empty', function () {
        allFeeds.forEach((feed) => {
          expect(feed.name).toBeDefined();
          expect(feed.name).toBeTruthy();
        });
      });
    });
  });

  /* New test suite named "The menu" */
  describe('The menu', function () {
    /*
     * Ensures the menu element is hidden by default.
     */
    const menu = $('.menu-hidden');
    const menuIcon = $('.menu-icon-link');

    it('is hidden', function () {
      expect(menu.attr('class')).toEqual('menu-hidden');
    });

    /* Ensures the menu changes visibility when the menu icon is clicked.
     * This test should has two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('toggles visibility', function () {
      menuIcon.click();
      expect(menu.attr('class')).not.toEqual('menu-hidden');
      menuIcon.click();
      expect(menu.attr('class')).toEqual('menu-hidden');
    });
  });

  /* New test suite named "Initial Entries" */
  describe('Initial Entries', function () {
    /* Ensures when the loadFeed function is called and completes its work,
     * there is at least a single .entry element within the .feed container.
     */

    //waits for async call to finish to ensure feeds are loaded before they are tested
    beforeEach(function (done) {
      loadFeed(0, function () {
        done();
      });
    });

    it('feed container has at least one entry', function () {
      const numberOfEntries = $('.entry').length;

      expect(numberOfEntries).toBeGreaterThan(0);
    });
  });

  /* New test suite named "New Feed Selection" */
  describe('New Feed Selection', function () {
    let firstEntry;
    let newEntry;
    /* Ensures when a new feed is loaded by the loadFeed function that the
     * content actually changes.
     */

    //waits for async call to finish
    beforeEach(function (done) {
      loadFeed(1, function () {
        firstEntry = $('.feed').html();

        loadFeed(2, function () {
          done();
        });
      });
    });

    /* First checks of the firstEntry is defined. Then, looks that firstEntry
     * and newEntry are not equal.
     */
    it('firstEntry and newEntry content is not equal', function () {
      expect(firstEntry).toBeDefined();
      newEntry = $('.feed').html();
      expect(newEntry).toBeDefined();
      expect(firstEntry).not.toEqual(newEntry);
    });
  });
}());