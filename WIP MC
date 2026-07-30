setCpm(122/4)
register('o', (orbit, pat) => pat.orbit(orbit))
setGainCurve(x => Math.pow(x, 2))

const kick = s("bd:2!4")
  .duck("2:3:4:5")
  .duckdepth(.35)
  .duckattack(.15)
  .postgain(.2)

const hats = s("[- hh]*4, [- - hh -]*2")
  .gain(.3)
  .delay(.5).delaytime(.375).delayfeedback(.3)
  .room(.15)

const rim = s("<- rim>*4")
  .postgain(.35)
  .pan(sine.range(.3,.7))
  .room(.3)

const perc = s("<- - perc - - perc - ->*8")
  .postgain(.25)
  .delay(.6).room(.4).rsize(2)

const bass = note("<0 0 3 0>*8")
  .scale("d:minor")
  .trans(-24)
  .s("sine")
  .lpf(400)
  .attack(.02).release(.3)
  .o(4)
  .postgain(.50)

const keys = chord("<Dm7 F --- C>/2")
  .mode("above:c4")
  .voicing()
  .s("gm_contrabass")
  .lpf(1800)
  .attack(.01).release(1.2)
  .room(.4).rsize(1.5)
  .delay(.375).delaytime(.375).delayfeedback(.25)
  .o(5)
  .postgain(.4)

const pad = chord("<Dm9 F6>/4")
  .mode("above:c3")
  .voicing()
  .s("gm_pad_warm")
  .hpf(300).lpf(1200)
  .attack(1.2).release(3.5)
  .room(.8).rsize(4)
  .o(6)
  .postgain(.3)

const lead = note("<~ 7 ~ 5 ~ ~ 10 ~>*4")
  .late(rand.range(0,.02))
  .scale("d:minor")
  .s("supersaw")
  .lpf(2000)
  .attack(.05).release(1.5)
  .room(.6).rsize(3)
  .delay(.5).delaytime(.5).delayfeedback(.4)
  .o(3)
  .postgain(.35)

const vinyl = s("crackle*20")
  .gain(.06)
  .lpf(3000)

$: arrange(
  [8,  stack(pad, vinyl)],                                   // intro — solo atmosfera
  [8,  stack(kick, hats, bass, pad, vinyl)],                 // el puto groove 
  [16, stack(kick, hats, rim, bass, keys, pad, vinyl)],      // full groove
  [8,  stack(kick, hats, rim, perc, bass, keys, lead, pad, vinyl)], // pico full
  [8,  stack(pad, keys.postgain(.25), vinyl)],               // rompe
  [16, stack(kick, hats, rim, perc, bass, keys, lead, pad, vinyl)], // final groove
  [8,  stack(pad.postgain(.15), vinyl)]                      // outro 
)
