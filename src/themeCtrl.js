import './style/theme.less'
export function createThemeCtrl(value, onGlobeChange) {
  let control = document.createElement('div')
  control.classList.add('theme')
  control.innerHTML = [
    '<div class="row"><div>地球主题：</div><div class="item"><select class="selector"><option value="1">地理</option>',
    '<option value="2">粒子</option><option value="3">粒子+线框</option></select></div></div>',
    // '<div class="row"><div>地球半径：</div><div class="item"><input type="text" value="200" /></div></div>',
  ].join('')
  document.body.append(control)
  control.querySelector('option[value="' + value + '"]').selected = true
  control.querySelector('.selector').addEventListener('change', function (e) {
    let selector = e.target
    if (_.isFunction(onGlobeChange)) {
      onGlobeChange(selector.value)
    }
    e.stopPropagation()
  })

  return control
}
