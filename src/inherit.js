function baseMerge(type, source, objs) {

    if (!/^(hard|soft)$/.test(type)) {
        throw new Error('[Error] The given type must be soft or hard')
    }

    if (!objs) {
        return source

    } else {

        for (let i = 0; i < objs.length; i++) {
            for (let key of Object.keys(objs[i])) {
                if (type === 'soft' && source.hasOwnProperty(key)) {
                    continue
                }
                source[key] = objs[i][key]
            }
        }
    }

}


function merge(source) {
    let objs = Array.from(arguments)
    objs.splice(0, 1)
    baseMerge('hard', source, objs)
}


function createByPrototype(ob) {
    let f = new Function()
    f.prototype = ob.prototype
    return new f()
}


function inherit(child, parent) {

    if (!child || !parent) {
        throw new Error('[Error] Unexpeacted parameters')
    }

    let extPrs = Array.from(arguments)
    extPrs.splice(0, 2)

    let _ob = createByPrototype(parent)

    if (Object.keys(child.prototype).length !== 0) {
        merge(_ob, child.prototype)
    }

    for (let pr of extPrs) {
        merge(
            Object.getPrototypeOf(_ob),
            Object.getPrototypeOf(createByPrototype(pr))
        )
    }

    _ob.constructor = child
    child.prototype = _ob
}