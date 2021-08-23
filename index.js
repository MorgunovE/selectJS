// 10
import {Select} from '/select/select'
// 17
import './select/style.scss'
// 7 and 22
const select = new Select('#select', {
  // 24
  placeholder: 'Choose element',
  // 30
  // selectedId: '3',
  // 26
  data: [
    {id: '1', value: 'React'},
    {id: '2', value: 'Angular'},
    {id: '3', value: 'Vue'},
    {id: '4', value: 'React Native'},
    {id: '5', value: 'Next'},
    {id: '6', value: 'Nest'},
  ],
  // 36
  onSelect(item) {
    console.log('Selected Item', item)
  }
})
window.s = select
