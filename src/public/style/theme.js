import DefaultColor from './themes/default/color'
import ChristmasColor from './themes/christmas/color'

const currentDate = new Date()
const year = currentDate.getFullYear()

const christmasDates = {
  begin: new Date(`12/15/${year}`),
  end: new Date(`01/15/${year}`)
}

let Color

if (currentDate > christmasDates.begin && currentDate < christmasDates.end) {
  require('./themes/christmas/color.css')
  require('./themes/christmas/style.css')
  Color = ChristmasColor
} else {
  require('./themes/default/color.css')
  require('./themes/default/style.css')
  Color = DefaultColor
}

export default Color