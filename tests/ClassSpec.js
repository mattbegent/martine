describe("Classes", function () {
	"use strict";

	it("has class functions", function () {
		expect($.addClass).not.toBe(undefined);
		expect($.removeClass).not.toBe(undefined);
		expect($.toggleClass).not.toBe(undefined);
		expect($.hasClass).not.toBe(undefined); 
	}); 

	it("adds the correct class", function () {
		var fixture = '<div class="addClass"></div>';

	    document.body.insertAdjacentHTML(
	      'afterbegin', 
	      fixture);

	    $.addClass($('.addClass'), 'bob');

		expect(document.querySelector('.addClass').classList.contains('bob')).toBe(true);
	});

	it("removes the correct class", function () {
		var fixture = '<div class="removeClass bob"></div>';

	    document.body.insertAdjacentHTML(
	      'afterbegin', 
	      fixture);

	    $.removeClass($('.removeClass'), 'bob');

		expect(document.querySelector('.removeClass').classList.contains('bob')).toBe(false);
	});

	it("toggles the correct class", function () {
		var fixture = '<div class="toggleClass bob"></div>';

	    document.body.insertAdjacentHTML(
	      'afterbegin', 
	      fixture);

	    $.toggleClass($('.toggleClass'), 'bob');

		expect(document.querySelector('.toggleClass').classList.contains('bob')).toBe(false);

		$.toggleClass($('.toggleClass'), 'bob');

		expect(document.querySelector('.toggleClass').classList.contains('bob')).toBe(true); 

	});

	it("correctly returns if an element has a class", function () {
		var fixture = '<div class="hasClass bob"></div>';

	    document.body.insertAdjacentHTML(
	      'afterbegin', 
	      fixture);

		expect($.hasClass($('.hasClass'), 'bob')).toBe(true); 

	});

});