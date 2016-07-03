var Circle = require('../src/circle.js');
var Utils = require('../src/utils.js');

describe("isCollideWithCircle function", function() {
	it("return false if two circles don't intersect", function() {
		var circle1 = new Circle(1,1,1);
		var circle2 = new Circle(3,1,1);
		expect(circle1.isCollideWithCircle(circle2)).toBe(false);
	});

	it("return false if two circles touch each other", function() {
		var circle1 = new Circle(1,1,1);
		var circle2 = new Circle(3,1,1);
		expect(circle1.isCollideWithCircle(circle2)).toBe(false);
	});

	it("return true if two circles intersect", function() {
		var circle1 = new Circle(1,1,1);
		var circle2 = new Circle(2,1,1);
		expect(circle1.isCollideWithCircle(circle2)).toBe(true);
	});
});

describe("isCursorInCircle function", function() {
	it("return true if the poit is inside the circle", function() {
		var circle1 = new Circle(1,1,1);
		expect(circle1.isCursorInCircle(1,0.5)).toBe(true);
	});

	it("return false if the poit is in the edge of the circle", function() {
		var circle1 = new Circle(1,1,1);
		expect(circle1.isCursorInCircle(2,1)).toBe(false);
	});

	it("return false if the poit is is not inside the circle", function() {
		var circle1 = new Circle(1,1,1);
		expect(circle1.isCursorInCircle(3,1)).toBe(false);
	});
});

describe("isNumeric(n) function", function() {
	it("return true if n is a number", function() {
		expect(Utils.isNumeric(1)).toBe(true);
	});

	it('return false if n is not a number', function() {
		expect(Utils.isNumeric(" ")).toBe(false);
	});

	it('return true if n is undefined', function() {
		expect(Utils.isNumeric()).toBe(true);
	});

	it('return true if n is undefined', function() {
		expect(Utils.isNumeric(undefined)).toBe(true);
	});

	it('return false if n is string of numbers and other characters', function() {
		expect(Utils.isNumeric("1aaa")).toBe(false);
	});

	it('return true if n is string of numbers and spaces', function() {
		expect(Utils.isNumeric("1 ")).toBe(true);
	});

	it('return false if n is infinite number', function() {
		expect(Utils.isNumeric(Number.POSITIVE_INFINITY)).toBe(false);
	});
});