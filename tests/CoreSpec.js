describe("Core Svelte", function () {
	"use strict";

	beforeEach(function () {
		var fixture = '<div id="fixture"></div>';

	    document.body.insertAdjacentHTML(
	      'afterbegin', 
	      fixture);
	});

	// testing setup
	it("has the fixture on the dom", function () {
		expect($('#fixture')).not.toBe(null);
	});

	it("has global methods and aliases", function() { 
		expect($).not.toBe(undefined);
		expect($).toEqual(svelte);
	}); 

	it("returns element", function() {  
		expect($('#fixture') instanceof Element).toBe(true);
	}); 

	it("returns null for elements that don't exist", function() {  
		expect($('.not-there')).toBe(null);
	}); 

	it("returns array if using :all", function() {  
		var query = $('#fixture:all');
		expect(query instanceof Array).toBe(true);
	});

	it("it doesn't matter where :all is used", function() { 

		var fixture = '<div id="all"></div>';

	    document.body.insertAdjacentHTML(
	      'afterbegin', 
	      fixture);

		var query = $(':all#all');
		expect(query.length === 1).toBe(true);
	}); 

});