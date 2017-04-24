import * as object from './src/object'
import * as array from './src/array'
import * as type from './src/type'
import * as event from './src/event'

export default object.merge(
    object,
    array,
    type,
    event
)



