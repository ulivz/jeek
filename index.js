import * as object from './src/object'
import * as array from './src/array'
import * as type from './src/type'

export default object.merge(
    object,
    array,
    type
)

console.log(object.merge(
    object,
    array,
    type
))




