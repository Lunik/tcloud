import DefaultColor from './themes/default/color'

const currentDate = new Date()
const year = currentDate.getFullYear()

let Color

if (false) {

} else {
  require('./themes/default/color.css')
  require('./themes/default/style.css')
  Color = DefaultColor
}

export default Color