export function increment(data) {
    return {
       type: 'INCREMENT', payload: data
    }
 }
 export function decrement() {
    return {
       type: 'DECREMENT'
    }
 }
 export function reset() {
    return { type: 'RESET' }
 }

 export function registerFun(data) {
   return { type: 'REGISTER', payload: data }
}

 