export const getMaxInObj = (obj, _key = 'key', _val = 'value') => {
    let max = Object.keys(obj)[0];
    for (let key in obj) {
        if (obj[key] > obj[max]) {
            max = key;
        }
    }

    return {
        [_key]: max,
        [_val]: obj[max]
    };
};