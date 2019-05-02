// @import './css/index.css'
// import $ from 'jquery'
import $ from 'expose-loader?$!jquery'
const mv = require('./images/mv.jpg')
const img = new Image()
img.src = mv
document.body.appendChild(img)
require('./css/index.css')
const a = require('./a.js')
console.log('webpack4学习1')
console.log(a.name)
const b = () => {
  console.log('123')
}
b()
class A {

}
const c = new A()
console.log('$', $)
console.log('window.$', window.$)