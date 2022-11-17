const sumArrayNum = (array,num) => {
    let result = false;
    array.find(e => {
        for (let index of array) {
            if (e + index === num) return result = true;
        }
    })
    return result;
}


module.exports = sumArrayNum;

   