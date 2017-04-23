import * as object from './src/object'
import * as array from './src/array'
import * as type from './src/type'

let __ = object.merge(
    {},
    object,
    array,
    type
)

console.log(__)




