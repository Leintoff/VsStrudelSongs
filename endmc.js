//for mc server end wip
setCpm(130/4)
register('o', (orbit, pat) => pat.orbit(orbit))
setGainCurve(x => Math.pow(x, 2))


const drone = note("<[d3,f3,ab3,c4] [d3,f3,ab3,b3] [d3,f3,ab3,c4] [c3,eb3,gb3,a3]>/2")
  .s("gm_synth_choir")
  .mode("below:c4")
  .hpf(100).lpf(800)
  .attack(.6).release(.2)
  .room(.2).rsize(.1)
  .o(6)
  .postgain(.4)
  .pianoroll()

const highStrings = note("<d5 eb5 d5 c#5>/2")
  .s("gm_choir_aahs")
  .hpf(1500)
  .lps(299)
  .attack(2).release(0.1)
  .room(.1).rsize(5)
  .gain(sine.range(.15,.35).slow(2))
  .o(5)
  .postgain(.3)

const pulse = s("<bd:9 ~  bd:9 ~  ~ bd:9>*2")
  .lpf(150)
  .gain(rand.range(.5,.75))
  .late(rand.range(0,.03))
  .o(2)
  .postgain(.6)

const growl = note("<d1 ~ ~ ~>/8")
  .s("supersaw")
  .lpf(120).lpq(8)
  .attack(1.5).release(3)
  .gain(rand.range(.3,.5))
  .o(1)
  .postgain(.95)

const stabs = note("<~ ~ d3 ~ ~ ~ ~ eb2 ~ ~ ~ a2 ~ ~ ~ ~>*2")
  .s("gm_string_ensemble_2")
  .attack(.001).decay(.05).sustain(0).release(.3)
  .hpf(80)
  .room(.5).rsize(2)
  .gain(rand.range(.4,.8))
  .o(4)
  .postgain(.65)

const noise = s("<pink>*1")
  .hpf(2000).lpf(6000)
  .gain(sine.range(.02,.08).slow(2))
  .room(.3).rsize(6)
  .pan(sine.range(0,1).slow(2))
  .o(3)
  .postgain(.5)

$: arrange(
//  [8, stack(growl)],    // solo test
  [8, stack(drone, noise, pulse)],                                  // 
  [16, stack(drone, highStrings, noise, pulse)],               // 
  [12, stack(drone, highStrings, stabs, noise, pulse, growl)], // 
  [8,  stack(drone, highStrings, stabs, noise, pulse, growl)], // 
  [16, stack(drone, noise, pulse.postgain(.3))],                // 
)

