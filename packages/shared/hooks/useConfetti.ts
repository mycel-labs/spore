import party from 'party-js'

export default function useConfetti() {
  party.resolvableShapes['s1'] = '<span>💶</span>'
  party.resolvableShapes['s2'] = '<span>💵</span>'

  const runConfetti = (e) => {
    party.confetti(e.target, {
      shapes: ['s1', 's2'],
      count: 40,
      gravity: 500,
      spread: 20,
    })
  }
  const runSparkles = (e) => {
    party.sparkles(e.target, {
      shapes: ['s1', 's2'],
      count: 20,
    })
  }

  return {
    runSparkles,
    runConfetti,
  }
}
