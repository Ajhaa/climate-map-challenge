
const getMultipleIndeces = (list, ...indeces) => {
    let ret = [];
    indeces.forEach(i => ret.push(list[list.length-i]));
    return ret;
}

export default getMultipleIndeces;