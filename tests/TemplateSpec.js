describe("Template", function () {
	"use strict";

	it("has templating", function () {
		expect($.template).not.toBe(undefined);
	});

	it("returns expected value", function () {

		var result = $.template('{{= greeting }} there {{= name }}{{ if(1===1) { }}!{{ } }}', {
			greeting: 'Hi',
			name: 'Bob'
		});

		expect(result).toBe("Hi there Bob!");

	});

});
