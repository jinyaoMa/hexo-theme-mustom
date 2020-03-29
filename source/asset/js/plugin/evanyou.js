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
      r -= u / -50
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
      x.clearRect(0, 0, w, h) // clear all rect
      q = [{ x: 0, y: h * .7 + f }, { x: 0, y: h * .7 - f }]
      while (q[1].x < w + f) d(q[0], q[1]); // w + f
    }
  }
}


export default {
  init: evanyou.init,
  draw(){
    typeof evanyou.draw === 'function' && evanyou.draw();
  }
}