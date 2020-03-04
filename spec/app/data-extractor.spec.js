describe("Report data extractor", function () {
    let DataExtractor = require('../../app/data-extractor');
    const dataExtractor = new DataExtractor();
    let summaziredData;
    const dataset = [{ id: 1, amount: 134 }, { id: 2, amount: 33.4 }, { id: 3, amount: 653 }, { id: 5, amount: 5532 },
    { id: 6, amount: 431.33 }, { id: 8, amount: 444 }, { id: 9, amount: 10 }, { id: 10, amount: 1000 }, { id: 12, amount: 99.99 },
    { id: 15, amount: 123.44 }, { id: 20, amount: 323 }, { id: 44, amount: 55 }, { id: 33, amount: 76 }, { id: 50, amount: 1 },
    { id: 99, amount: 33.333 }, { id: 63, amount: 33.333 }, { id: 415, amount: 66.333 }, { id: 45, amount: 45.555 }, { id: 36, amount: 55.32 }];

    beforeEach(function () {
        summaziredData = dataExtractor.summarizeData(dataset);
    });

    it("should group objects with id ONLY multiple of 3 into foo and store the id into ids array", function () {
        expect(summaziredData).toBeDefined;
        expect(summaziredData.foo).toBeDefined;
        expect(summaziredData.foo.ids).toBeDefined;
        summaziredData.foo.ids.forEach(function (id) {
            expect(id % 3).toBe(0);
            expect(id % 5).not.toBe(0);
            expect(id % 15).not.toBe(0);
        }, this);
    });

    it("should group objects with id ONLY multiple of 5 into bar and store the id into ids array", function () {
        expect(summaziredData).toBeDefined;
        expect(summaziredData.bar).toBeDefined;
        expect(summaziredData.bar.ids).toBeDefined;
        summaziredData.bar.ids.forEach(function (id) {
            expect(id % 3).not.toBe(0);
            expect(id % 5).toBe(0);
            expect(id % 15).not.toBe(0);
        }, this);
    });

    it("should group objects with id multiple of 3 AND 5 into foobar and store the id into ids array", function () {
        expect(summaziredData).toBeDefined;
        expect(summaziredData.fooBar).toBeDefined;
        expect(summaziredData.fooBar.ids).toBeDefined;
        summaziredData.fooBar.ids.forEach(function (id) {
            expect(id % 3).toBe(0);
            expect(id % 5).toBe(0);
        }, this);
    });

    describe("foo group", function () {
        it("should count # of entries", function () {
            expect(summaziredData.foo.count).toBeDefined();
            expect(summaziredData.foo.count).toBe(8);
        });

        it("should sum total amount and round result", function () {
            expect(summaziredData.foo.totalAmount).toBeDefined();
            expect(summaziredData.foo.totalAmount).toBe(1392);
        });

        //Extra check is make sure that the value exists and the id is only multiple of 3
        it("should find max amount", function () {
            expect(summaziredData.foo.max).toBeDefined();
            expect(summaziredData.foo.max).toBe(653);
        });

        it("should find min amount", function () {
            expect(summaziredData.foo.min).toBeDefined();
            expect(summaziredData.foo.min).toBe(10);
        });
    });

    describe("bar group", function () {
        it("should count # of entries", function () {
            expect(summaziredData.bar.count).toBeDefined();
            expect(summaziredData.bar.count).toBe(5);
        });

        it("should sum total amount and round result", function () {
            expect(summaziredData.bar.totalAmount).toBeDefined();
            expect(summaziredData.bar.totalAmount).toBe(6922);
        });

        it("should find max amount", function () {
            expect(summaziredData.bar.max).toBeDefined();
            expect(summaziredData.bar.max).toBe(5532);
        });

        it("should find min amount", function () {
            expect(summaziredData.bar.min).toBeDefined();
            expect(summaziredData.bar.min).toBe(1);
        });
    });

    describe("fooBar group", function () {
        it("should count # of entries", function () {
            expect(summaziredData.fooBar.count).toBeDefined();
            expect(summaziredData.fooBar.count).toBe(2);
        });

        it("should sum total amount and round result", function () {
            expect(summaziredData.fooBar.totalAmount).toBeDefined();
            expect(summaziredData.fooBar.totalAmount).toBe(169);
        });

        it("should find max amount", function () {
            expect(summaziredData.fooBar.max).toBeDefined();
            expect(summaziredData.fooBar.max).toBe(123.44);
        });

        it("should find min amount", function () {
            expect(summaziredData.fooBar.min).toBeDefined();
            expect(summaziredData.fooBar.min).toBe(45.555);
        });
    })

});  