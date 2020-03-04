function DataExtractor() {}

//helper function
function formObject(data) {
    const amounts = data.map(data => data.amount);
    const min = Math.min.apply(Math, amounts);
    const max = Math.max.apply(Math, amounts);
    const totalAmount = Math.round(amounts.reduce((amt, acc) => amt + acc));

    const ids = [];

    for (let i = 0; i < data.length; i++) {
        ids.push(data[i].id);
    }

    const count = ids.length;
    const avg = Math.floor(totalAmount / count);

    return {
        ids,
        count,
        avg,
        min,
        max,
        totalAmount
    };
}


DataExtractor.prototype.summarizeData = function (dataSet) {

    const foos = [];
    const bars = [];
    const fooBars = [];

    // for loop instead of forEach for better performance
    for (let i = 0; i < dataSet.length; i++) {
        const data = dataSet[i];
        const {
            id
        } = data;
        const key = 'group';

        if (id % 3 === 0 && id % 5 === 0) fooBars.push(data)
        else if (id % 3 === 0) foos.push(data)
        else if (id % 5 === 0) bars.push(data);
    }

    const foo = formObject(foos);
    const bar = formObject(bars);
    const fooBar = formObject(fooBars);

    return {
        foo,
        bar,
        fooBar
    };

};


module.exports = DataExtractor;