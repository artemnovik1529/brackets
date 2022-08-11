module.exports =
    function check(str, bracketsConfig) {
    if (str.length % 2 !== 0 ) {
        return false;
    }

    let configs = {};
    let openBrackets = [];
    let closeBrackets = [];
    let sameBrackets = {};
    let stack = [];
    let result = true;
    let positionCounter = 0;

    bracketsConfig.forEach(function (config, ind, arr) {
        configs[config.join('')] = {
            open: config[0],
            close: config[1],
        }
        openBrackets.push(config[0]);
        closeBrackets.push(config[1]);
        if (config[0] === config[1]) {
            sameBrackets[config.join('')] = {
                open: config[0],
                close: config[1],
            }
        }
    });

    if (Object.keys(sameBrackets).length) {
        for (const [key, value] of Object.entries(sameBrackets)) {
            if (value.open === '|') {
                value.open = '\\|';
            }
            let regexp = new RegExp(value.open, 'g');

            if ((str.match(regexp) || []).length % 2 === 0) {
                str = str.replace(regexp, '');
            } else {
                return false;
            }
        }
    }
    console.log(str);
    str.split('').forEach(function (item, ind, arr) {
        if (isOpenBrackets(item, openBrackets)) {
            let i = getCloseBracket(item, configs);
            stack.push(i);
            return;
        }

        let prevItem = stack.pop();
        if (item === prevItem) {
            return;
        } else {
            result = false;
        }
    });

    return result && stack.length === 0;


    function isOpenBrackets(bracket, openBrackets) {
        return openBrackets.includes(bracket);
    }

    function getCloseBracket(openBracket, configs) {
        let result = null;
        for (const [key,value] of Object.entries(configs)) {
            if (key.includes(openBracket)) {
                result = value.close;
            };
        }

        return result;
    }
}
//
// const config1 = [['(', ')']];
// const config2 = [['(', ')'], ['[', ']']];
// const config3 = [['(', ')'], ['[', ']'], ['{', '}']];
// const config4 = [['|', '|']];
// const config5 = [['(', ')'], ['|', '|']];
// const config6 = [['1', '2'], ['3', '4'], ['5', '6'], ['7', '7'], ['8', '8']];
// const config7 = [['(', ')'], ['[', ']'], ['{', '}'], ['|', '|']];
// console.log(check('|(|)', config5));
// console.log(check('5555512575557777777555566667888888667661133833448441111222233333444442266666', config6));
