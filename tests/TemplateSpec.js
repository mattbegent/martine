describe("Template", function () {
	"use strict";

	it("has templating", function () {
		expect($.template).not.toBe(undefined);
	}); 

	it("returns expected value", function () {
		// var returned = $.template('{{greeting}} there {{name}}!', { greeting: 'Hi', name: 'Bob'}); 
		// expect(returned).toBe("Hi there Bob!"); 

		var result = $.template('{{= greeting }} there {{= name }}{{ if(1===1) { }}!{{ } }}', {
			greeting: 'Hi',
			name: 'Bob'
		});
		expect(result).toBe("Hi there Bob!");  
	});

});