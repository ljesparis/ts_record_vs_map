function time(fn: () => void): number {
    const now = Date.now();
    fn();
    return Date.now() - now;
}

function generateRecord(t: number): Record<string, number> {
    const record: Record<string, number> = {};
    for(let i = 0; i <= t; ++i) {
        record[`${i}`] = i
    }

    return record;
}

function generateMap(t: number): Map<string, number> {
    const map: Map<string, number> = new Map();
    for(let i = 0; i <= t; ++i) {
        map.set(`${i}`, i)
    }

    return map;
}

function recordGet(record: Record<string, number>, v: number): () => void {
    return function() {
        for(let i = 0; i <= v; ++i) {
            record[`${i}`]
        }
    }
}

function mapGet(map: Map<string, number>, v: number): () => void {
    return function() {
        for(let i = 0; i <= v; ++i) {
            map.get(`${i}`)
        }
    }
}

const tests = [10, 100, 1000, 10000, 100000, 1_000_000, 10_000_000];

/*
 * if you add 100_000_000 to the arraylist you'll reach map max size -> * RangeError: Map maximum size exceeded 
 * https://stackoverflow.com/a/54466812
 * tests.push(100_000_000)
*/

console.log("test start")

console.log("generateRecord")
tests.forEach(t => {
    console.log(t, time(() => generateRecord(t)));
})


console.log("generateMap")
tests.forEach(t => {
    console.log(t, time(() => generateMap(t)));
})

console.log("recordGet => const record = {'1': 1}; record['1']")
tests.forEach(t => {
    const record = generateRecord(t)
    console.log(t, time(recordGet(record, t)));
})

console.log("mapGet => const map = new Map(); map.get('1')")
tests.forEach(t => {
    const map = generateMap(t);
    console.log(t, time(mapGet(map, t)));
})

console.log("test end")
