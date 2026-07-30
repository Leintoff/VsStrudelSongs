setCpm(136/4)
register('o', (orbit, pat) => pat.orbit(orbit))
setGainCurve(x => Math.pow(x, 2))
register('acidenv', (x, pat) => pat.lpf(200).lpenv(x * 12).lps(.4).lpd(.12))

const kick = s("bd:3!4")
  .duck("2:3:4:5:6")
  .duckdepth(.4)
  .duckattack(.12)
  .postgain(.25)

const hats = s("[- hh]*4")
  .gain(.2)
  .delay(.3)
  .room(.1)


const clap = s("[- cp]*2")
  .postgain(.4)
  .delay(.4)
  .room(.2).rsize(2)

const ride = s("[- oh]*4") // puta pesada, hay que bajarle el gain 
  .gain(.25)
  .room(.2)
  .delay(.25)

const bass = note("<0>*16")
  .scale("a:minor")
  .trans("<-24 -21>/4")
  .detune(rand)
  .s("supersaw")
  .acidenv("<.2 .3 .4 .5 .5 .4 .3 .2>/8")
  .o(4)
  .postgain(.7)
  ._pianoroll({ fill: 1 })

const acid = note("<2 3 0 7 5>*16")
  .late(.01)
  .scale("a:minor")
  .s("supersaw")
  .acidenv("<.1 .2 .3 .35 .4 .35 .3 .2>/8")
  .room(.6).rsize(.8)
  .o(3)
  .postgain(.7)
  .pianoroll({ labels: 1 })


const stabs = note("<5 7 9 10>*8")
  .scale("a:minor")
  .s("supersaw")
  .lpf(1200)
  .attack(.05).release(.9)
  .room(.7).rsize(2)
  .o(6)
  .postgain(.35)

const pad = every(4, x => x.lpf(1400).room(.9),
  chord("<Am C>/4")
    .mode("above:c4")
    .s("gm_pad_halo")
    .voicing()
    .hpf(500).lpf(900)
    .attack(.4).release(3)
    .room(.7).rsize(4)
    .postgain(.3)
)

$: arrange(
  [8,  stack(kick, hats)],                                      // intro
  [8,  stack(kick, hats, clap, bass)],                          // atencion
  [16, stack(kick, hats, clap, bass, acid)],               // drop 1 saque el ride tambien
  [8,  stack(pad, acid.postgain(.45))],                          // preambulo :p
  [16, stack(kick, hats, clap, bass, acid, stabs, pad)],   // drop 2 (full) saque el ride porque suena pesado
  [8,  stack(hats.gain(.25), pad.postgain(.15))]      
  // outro
).color("cyan")
  //.scope()
