import TWEEN from '@tweenjs/tween.js'
export function boxMarkAnimate(model) {
  let tw = new TWEEN.Tween(model.scale)
  tw.to(
    {
      z: 1,
    },
    2000
  )
  tw.easing(TWEEN.Easing.Sinusoidal.InOut)
  tw.start()
}
