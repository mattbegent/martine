describe("Cookies", function () {
	"use strict";

	it("has cookie functions", function () {
		expect($.cookie).not.toBe(undefined);
		expect($.cookie.add).not.toBe(undefined);
		expect($.cookie.read).not.toBe(undefined);
		expect($.cookie.remove).not.toBe(undefined); 
	}); 

	it("adds and reads the correct cookies", function () {

	    $.cookie.add('test', 'test');

		expect($.cookie.read('test')).toBe('test');

		$.cookie.add('123', '123');

		expect($.cookie.read('123')).toBe('123');

	});

	it("removes cookies", function () {

	    $.cookie.add('test', 'test');

		expect($.cookie.remove('test')).toBeUndefined();

		$.cookie.add('123', '123');

		expect($.cookie.remove('123')).toBeUndefined();
		
	});


});