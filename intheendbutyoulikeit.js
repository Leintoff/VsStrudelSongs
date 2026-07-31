setCpm(300/2)
register('o', (orbit, pat) => pat.orbit(orbit))
setGainCurve(x => Math.pow(x, 2))

const hum1 = note("d2").s("sine").lpf(300).attack(3).release(3)
  .gain(perlin.range(.15,.24).slow(13))
  .o(0).postgain(.5)
const hum2 = note("d2").s("sine").detune(.09).lpf(300).attack(3).release(3)
  .gain(perlin.range(.1,.18).slow(17))
  .o(0).postgain(.4)

const roomtone = s("<pink>*1")
  .hpf(200).lpf(2500)
  .gain(perlin.range(.03,.08).slow(19))
  .room(.5).rsize(6)
  .pan(sine.range(0,1).slow(23))
  .o(1).postgain(.45)

const pad = note("<[d3,a3] [d3,g3,a3] [d3,a3,e4] [d3,a3]>/16")
  .s("gm_pad_halo")
  .hpf(150).lpf(700)
  .attack(3).release(2)
  .room(.7).rsize(6)
  .gain(perlin.range(.2,.3).slow(19))
  .o(4).postgain(.95)

const musicbox = note("<~ ~ e5 ~ ~ d5 ~ ~ b4 ~ ~ ~ ~ e5 ~ ~ ~ ~ d5 ~ ~ c#5 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~>/4")
  .s("gm_music_box")
  .lpf(1800)
  .attack(.01).release(1.5)
  .room(.6).rsize(5)
  .delay(.3).delaytime(.5).delayfeedback(.3)
  .gain(rand.range(.22,.38))
  .o(5).postgain(.5)

const footsteps = s("<~ ~ ~ bd:9 ~ ~ ~ ~ ~ ~ bd:9 ~ ~ ~ ~ ~>/4")
  .lpf(150)
  .room(.7).rsize(6)
  .gain(rand.range(.2,.4))
  .pan(rand)
  .late(rand.range(0,.05))
  .o(3).postgain(.5)

const intrusion = note("<~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ eb5>/16")
  .s("gm_celesta")
  .attack(.01).release(2)
  .room(.5).rsize(4)
  .gain(.28)
  .o(6).postgain(.55)

$: arrange(
  [4, stack(hum1, hum2, roomtone)],                                     // 
  [16, stack(hum1, hum2, roomtone, pad)],                                // 
  [32, stack(hum1, hum2, roomtone, pad, musicbox, footsteps)],           //
  [32, stack(hum1, hum2, roomtone, pad, musicbox, footsteps, intrusion)],// 
  [16, stack(hum1, hum2, roomtone, pad)],                                // 
)
