module.exports = function check(str, bracketsConfig) {
    let result = '',
        objects = {};
    for (let i=0;i<=bracketsConfig.length-1;i++) {
        objects[bracketsConfig[i][0]] = bracketsConfig[i][1];
    };
    for (let b=0;b<=str.length-1;b++) {
        if (str[b] === objects[str[b]]) {
            if (result[result.length-1] === objects[str[b]]) {
                result = result.substring(0, result.length-1);
            } else {
                result += str[b];
            }
        } else {
            if (Object.keys(objects).includes(str[b])) {
                result += str[b];
            } else {
                if(str[b] === objects[result[result.length-1]] ) {
                    result = result.substring(0, result.length-1);
                } else {
                    return false
                }
            }
        }
    };
    if (result.length === 0) {
        return true
    } else {
        return false
    }
}