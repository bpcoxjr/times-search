describe('timesSearchApp', function() {

	var ROOT = 'http://localhost:8080/times-search/app/index.html#';

	//function to fill out and submit search form
	function createSearchEntry(query, searchDate, sortChoice) {
		//direct the browser to the search form end point
		browser.get(ROOT + '/');
		//find element by its ng-model attribute value & enter query value into input
	    element(by.model('query')).sendKeys(query);
	   	//input date 5/1/2016 into both datepickers
	   	element.all(by.css('.md-datepicker-input')).sendKeys(searchDate);
	    //and finally, the same w/ sort by 'newest' radio button
	    element(by.id('newestRadio')).sendKeys(sortChoice);
	    //after entering values, find & click submit button
	    return element(by.css('button[type=submit]')).click();
	}

	//make sure about partial loads when 'about' clicked
	it('should show the about partial when about link clicked', function(){
		browser.get(ROOT + '/home');
		element(by.id('aboutLink')).click();
		expect(browser.getCurrentUrl()).toEqual(ROOT + '/about');
	});

	//make sure NYT link directs to nytimes.com
	it('should open new browser tab and direct to nytimes.com', function(){
		browser.get(ROOT + '/home');
		expect(element(by.id('timesLink')).getAttribute('href')).toEqual('http://www.nytimes.com/');
	});

	//make sure there are no results yet b/c nothing has been searched for
	it('should have no results data yet', function() {
	    browser.get(ROOT + '/results');
	     expect(element.all(by.css('.flex-box')).count()).toBe(0);
	});

	//generate a new search query on politics
	it('should create a new search', function() {
		browser.get(ROOT + '/home');
	    //first create a search term to query for
	    var query = 'new year';
	    //then assign a search date to both datepickers
	    var searchDate = '1/1/2016'
	    //then check 'newest' radio button
	    var sortChoice = element(by.id('newestRadio')).click();
	    //call createSearchEntry function and pass in query/dateFrom/dateTo/sortChoice
	    createSearchEntry(query, searchDate, sortChoice);
	    //get the url of the browser and assert that it matches the results endpoint
	    expect(browser.getLocationAbsUrl()).toMatch('/results');
	    //check to be sure there is now at least one flex-box, verifying results were returned and appended to DOM
	    expect(element(by.css('.flex-box')).isPresent()).toBe(true);
  	});

  	//make sure clicking 'go back' button returns view to home
  	it('should go back to home route when go back button clicked', function(){
  		browser.get(ROOT + '/results');
  		element(by.id('goBack')).click();
  		expect(browser.getCurrentUrl()).toEqual(ROOT + '/home');
  	});
});