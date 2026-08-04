
function blockArrange(patArr, modifiers = []) {
  return stack(
    ...patArr.map(([pat, maskPat]) => {
      pat = [pat].flat()
      return maskPat.fmap(m => {
        return stack(...pat.map(p => {
          if (m == 0) {
            return
          }
          const ms = m.toString()
          let newPat = p
          if (ms.includes('R')){
            newPat = newPat.restart(1)
          }
          if (ms.includes('B')) {
            newPat = newPat.rev().speed(-1)
          }
          modifiers.forEach(([mod, callback]) => {
            if (mod(ms)) {
              newPat = callback(newPat)
            }
          })
          return newPat
        }).filter(Boolean))
      }).innerJoin()
    }).flat()
  )
}
// ============================================================

samples('github:tidalcycles/dirt-samples')
setCps(140/60/4)

const energy = slider(9175.5, 300, 10000)
const leadFilter = slider(300, 300, 4000)
const chopFilter = slider(769.8, 300, 3000)

const kick  = s("tech:5").duck(2).postgain(5.5).duckdepth(1).duckattack("0.15:0.25").hpf(75).speed(0.5).end(0.2)
const clap  = s(" [ ~ cp]").bank("[KorgDDM110, RolandTR707]").speed(0.8).postgain(0.2).end(0.5).fast(2)
const hhc   = s("{hh*16}%1").postgain(0.35).room(0.5).bank("RolandTR808").lpf(energy).speed(1).end(0.1).distort(1).gain(0.5).o(2)
const hho   = s("~ hh").bank("RolandTR808").speed(0.5).gain(0.7).fast(4).room(0).o(2)
const perc  = s("psr:[2|12|24|25]".fast(8)).hpf(2000).speed(1).gain(0.25).ply(2).o(2).lpf(energy).jux(rev)
const bass  = note("{c#3@3 a2@2 e2@3 c#3@0.5 f#2@2.5 a2@2 e2@3}%8".seg(16).slow(2))
              .trans("[0, -12]").rarely(trans("12")).distort(1.2)
              .sound("[supersaw, square]").postgain(0.18).lpf(energy).o(2)
const lead  = n(irand("6").seg(8).slow(2)).scale("c#4:minor:pentatonic")
              .fast("[8]").slow(4).trans("[12,0]")
              .sound("[supersaw, square]").delay(0.1).room(1).rfade(30)
              .lpf(leadFilter).almostNever(mask(0)).postgain(0.3).ribbon("<4 5>".slow(2), 1).o(2)
const chops = s("CHOPS").clip(1).note("c2").postgain(0.3).jux(rev).room(0.5).delay(1)
              .lpf(chopFilter).slice(16, "[0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15]".fast(4)).ply(2).o(2)

_$: blockArrange(
  [
    [[kick],  "<1@8 1@8 1@8 1@8   0@4 1@4 1@4 1@4   0@4 0@4 1@4 1@4   1@8 1@8 0@16>"],
    [[clap],  "<0@8 1@8 0@8 1@8   0@4 1@4 0@4 1@4   W@4 1@4 0@4 1@4   0@8 1@8 0@16>"],
    [[hhc],   "<1@32 0@4 1@4 1@4   0@4 1@4 0@4 1@4   Y@4 1@4 0@4 1@4   1@8 1@8 0@16>"],
    [[hho],   "<0@8 1@8 0@8 0@8   0@4 0@4 1@4 0@4   Z@4 0@4 1@4 0@4   0@8 1@8 0@16>"],
    [[perc],  "<0@8 1@8 0@8 0@8   0@4 1@4 0@4 1@4   X@4 0@4 1@4 0@4   1@8 1@8 0@16>"],
    [[bass],  "<V@8 W@8 X@8 Y@8   Z@4 W@4 V@4 X@4   Y@4 Z@4 W@4 V@4   X@8 Y@8 0@16>"],
    [[lead],  "<0@8 0@8 0@8 0@8   0@4 0@4 1@4 0@4   0@4 1@4 0@4 0@4   0@8 0@8 0@16>"],
    [[chops], "<0@8 S@8 0@8 S@8   0@4 0@4 S@4 0@4   S@4 0@4 S@4 0@4   0@8 S@8 0@16>"],
  ],
  [
    [(m) => m.includes('S'), (x) => x.lpf(1000)],
    [(m) => m.includes('T'), (x) => x.hpf(600)],
    [(m) => m.includes('G'), (x) => x.ply(4)],
    [(m) => m.includes('V'), (x) => x.lpf(200)],
    [(m) => m.includes('W'), (x) => x.lpf(500)],
    [(m) => m.includes('X'), (x) => x.lpf(1000)],
    [(m) => m.includes('Y'), (x) => x.lpf(2500)],
    [(m) => m.includes('Z'), (x) => x.lpf(5000)],
    [(m) => m.includes('A'), (x) => x.room(0.75)],
  ]
)
.punchcard({vertical: true})
.theme("bluescreen")

DRUMS: stack(kick, clap, hhc, hho, perc)
BASSLINE: bass
//LEAD: lead
//CHOPS: chops
