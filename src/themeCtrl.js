import './style/theme.less'
export function createThemeCtrl(onChange) {
  let control = document.createElement('div')
  control.classList.add('theme')
  control.innerHTML =
    '<div>地球主题：</div><div><select class="selector"><option value="1">地理</option>' +
    '<option value="2">粒子</option><option value="3">粒子+线框</option></select></div>'
  document.body.append(control)

  control.querySelector('.selector').addEventListener('change', function (e) {
    let selector = e.target
    if (_.isFunction(onChange)) {
      onChange(selector.value)
    }
    e.stopPropagation()
  })
  return control
}
