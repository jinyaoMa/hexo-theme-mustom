const evanyou = {
  draw: null,
  init(selector) {
    let c = document.querySelector(selector),
      x = c.getContext('2d'),
      pr = window.devicePixelRatio || 1,
      /*devicePixelRatio
       *devicePixelRatio = screenPhysicalPixels/deviceIndependentPixels
       *eg.iPhone4s,Resolution:960*640
       *   screenPhysicalPixels=640px
       *   deviceIndependentPixels=320px
       *   devicePixelRatio=640/320=2
       *You need set diff-size imgs to fit the devicePixelRatio.
       */
      w = window.innerWidth,
      h = window.innerHeight,
      f = 90, // InitialDistance
      q,
      z = Math.random,
      r = 0,
      u = Math.PI * 2,
      v = Math.cos

    c.width = w * pr
    c.height = h * pr
    x.scale(pr, pr) // Synchronization with devicePixelRatio
    x.globalAlpha = 0.6 // gloabalAlpha set or return the opacity-value of draw

    function d(i, j) {
      x.beginPath()
      x.moveTo(i.x, i.y)
      x.lineTo(j.x, j.y)
      let k = j.x + (z() * 2 - 0.25) * f,
        // x->[-0.25 * f, 1.75 * f]
        // x_average = 0.75 * 90 = 67.5
        // number_rects = 1080 / 67.5 = 16
        n = y(j.y)
      /*When k < 0:
      *The first rect will be invisable, it is in the window's left.
      *So we can see the first line on the window sometimes changes the initial position.
      */
      x.lineTo(k, n)
      x.closePath()
      r -= u / -22
      x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
      /*ColorSelectionAlgorithm
      * v=Math.cos,u=2*Math.Pi,r = n * Math.PI/25(n=0,1,2...)
      * (R,G,B)=>Hexadecimal === (R << 16|G << 8|B).toString(16)
      * 0xFFFFFF = 16777215
      * It's equate to:
      *   R = cos(r)*127+128
      *   G = cos(r+2*PI/3)*127+128
      *   B = cos(r+4*PI/3)*127+128
      * 128 << 16 === 128 * (2 ** 16)
       */
      x.fill()
      q[0] = q[1] // old point -> new q[0]
      q[1] = { x: k, y: n } // new point(k, n) -> new q[1]
      // constant line
    }

    function y(p) {
      let t = p + (z() * 2 - 1.1) * f
      return (t > h || t < 0) ? y(p) : t
      // y->[-1.1, 0.9)
    }

    this.draw = function () {
      c.style.visibility = 'visible'
      x.clearRect(0, 0, w, h) // clear all rect
      q = [{ x: 0, y: h * .7 + f }, { x: 0, y: h * .7 - f }]
      while (q[1].x < w + f) d(q[0], q[1]) // w + f
    }
  }
}

const wave = {
  draw: null,
  animate: null,
  hide: null,
  clear() {
    window.cancelAnimationFrame(this.animate)
    this.animate = null
  },
  init(selector) {
    let WAVE_HEIGHT = 200 //波浪变化高度
    let SCALE = 0.2 // 绘制速率
    let CYCLE = 360 / SCALE
    let TIME = 0

    let c = document.querySelector(selector)
    let width = window.innerWidth
    let height = window.innerHeight

    let x = c.getContext("2d")
    c.width = width
    c.height = height

    let colors = {
      op: ['66', '99', 'cc'],
      now: [],
      r: 0,
      d: 5 * 16 * 30 * 2, // 5/c, 1f/16ms, 30fps, 2 times slower
      num: -1,
      roll() {
        let that = this
        let u = Math.PI * 2,
          v = Math.cos
        for (let i = 0; i < that.op.length; i++) {
          if (that.r > 1 || that.r < 0) {
            that.d *= -1
          }
          that.r += u / that.d
          that.now[i] = '#' + (v(that.r) * 127 + 128 << 16 | v(that.r + u / 3) * 127 + 128 << 8 | v(that.r + u / 3 * 2) * 127 + 128).toString(16) + that.op[i]
        }
      },
      isNext(num) {
        if (this.num !== num) {
          this.num = num
          return true
        }
        return false
      }
    }

    function _draw() {
      x.clearRect(0, 0, width, height)

      TIME = (TIME + 1) % CYCLE
      let angle = SCALE * TIME // 当前正弦角度
      let dAngle = 45 // 两个波峰相差的角度
      //if (colors.isNext(Math.floor(TIME * 5 / CYCLE))) {
        colors.roll()
      //}

      x.beginPath()
      x.moveTo(0, height * 0.77 + distance(WAVE_HEIGHT, angle, 0))
      x.bezierCurveTo(
        width * 0.6,
        height * 0.77 + distance(WAVE_HEIGHT, angle, dAngle),
        width * 0.4,
        height * 0.77 + distance(WAVE_HEIGHT, angle, 2 * dAngle),
        width,
        height * 0.66 + distance(WAVE_HEIGHT, angle, 3 * dAngle)
      )
      x.lineTo(width, height)
      x.lineTo(0, height)
      x.fillStyle = colors.now[2]
      x.fill()

      x.beginPath()
      x.moveTo(0, height * 0.77 + distance(WAVE_HEIGHT, angle, -15))
      x.bezierCurveTo(
        width * 0.55,
        height * 0.77 + distance(WAVE_HEIGHT, angle, dAngle - 15),
        width * 0.45,
        height * 0.77 + distance(WAVE_HEIGHT, angle, 2 * dAngle - 30),
        width,
        height * 0.66 + distance(WAVE_HEIGHT, angle, 3 * dAngle - 45)
      )
      x.lineTo(width, height)
      x.lineTo(0, height)
      x.fillStyle = colors.now[1]
      x.fill()

      x.beginPath()
      x.moveTo(0, height * 0.77 + distance(WAVE_HEIGHT, angle, -30))
      x.bezierCurveTo(
        width * 0.5,
        height * 0.77 + distance(WAVE_HEIGHT, angle, dAngle - 30),
        width * 0.5,
        height * 0.77 + distance(WAVE_HEIGHT, angle, 2 * dAngle - 60),
        width,
        height * 0.66 + distance(WAVE_HEIGHT, angle, 3 * dAngle - 90)
      )
      x.lineTo(width, height)
      x.lineTo(0, height)
      x.fillStyle = colors.now[0]
      x.fill()

      function distance(height, currAngle, diffAngle) {
        return height * Math.cos((((currAngle - diffAngle) % 360) * Math.PI) / 180)
      }
    }

    let that = this
    that.draw = function () {
      c.style.visibility = 'visible'
      that.animate = window.requestAnimationFrame(function fn() {
        _draw()
        that.animate = requestAnimationFrame(fn)
      })
    }
    that.hide = function () {
      that.clear()
      c.style.visibility = 'hidden'
    }
  }
}

export default {
  init(s) {
    evanyou.init(s)
    wave.init(s)
  },
  draw(opt) {
    wave.clear()
    if (opt.toLowerCase() === 'wave') {
      typeof wave.draw === 'function' && wave.draw()
    } else {
      typeof evanyou.draw === 'function' && evanyou.draw()
    }
  },
  hide() {
    wave.hide()
  }
}