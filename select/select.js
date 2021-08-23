// 23-1 and 25-3 and 27-2 and 27-7 and 31-2
const getTemplate = (data = [], placeholder, selectedId) => {
  // console.log(data)
  let text = placeholder ?? 'Default placeholder'
  const items = data.map(item => {
    // 31-3
    let cls = ''
    if (item.id === selectedId) {
      text = item.value
      cls = 'selected'
    }
    return `
      <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
    `
  })
  // 33
  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span data-type="value">${text}</span>
      <i class="fa fa-chevron-down" data-type="arrow"></i>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join('')}
      </ul>
    </div>
  `
}

// 9
export class Select {
// 23
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    // 25
    this.options = options
    // 27-5 and 31
    this.selectedId = options.selectedId
    // 23-3
    this.#render()
    // 23-5
    this.#setup()
  }
  
  // 23-2
  #render() {
    // 25-1 and 27
    const {placeholder, data} = this.options
    this.$el.classList.add('select')
    // 25-2 and 27-1 and 31-1
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)
  }
  
  // 23-4
  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener('click', this.clickHandler)
    this.$arrow = this.$el.querySelector('[data-type="arrow"]')
    // 27-8
    this.$value = this.$el.querySelector('[data-type="value"]')
  }
  
  open() {
    this.$el.classList.add('open')
    this.$arrow.classList.remove('fa-chevron-down')
    this.$arrow.classList.add('fa-chevron-up')
  }
  
  close() {
    this.$el.classList.remove('open')
    this.$arrow.classList.add('fa-chevron-down')
    this.$arrow.classList.remove('fa-chevron-up')
  }
  
  // 23-7
  clickHandler(event) {
    // console.log(event)
    const {type} = event.target.dataset
    // console.log(type)
    if (type === 'input') {
      this.toggle()
    } else if (type === 'item') {
      // 27-3
      const id = event.target.dataset.id
      // console.log('id', id)
      this.select(id)
    } else if (type === 'backdrop') {
      // 35
      // console.log('Close')
      this.close()
    }
  }
  
  // 27-4
  select(id) {
    this.selectedId = id
    // 27-9
    this.$value.textContent = this.current.value
    // 29
    this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
      el.classList.remove('selected')
    })
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
    // 37
    this.options.onSelect ? this.options.onSelect(this.current) : null
    this.close()
  }
  
  // 27-6
  get current() {
    return this.options.data.find(item => item.id === this.selectedId)
  }
  
  // 23-9
  get isOpen() {
    return this.$el.classList.contains('open')
  }
  
  // 23-8
  toggle() {
    this.isOpen ? this.close() : this.open()
  }
  
  // 23-6
  destroy() {
    this.$el.removeEventListener('click', this.clickHandler)
    // 32
    this.$el.innerHTML = ''
  }
}