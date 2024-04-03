import { useState, useEffect } from 'react'

export default function ProfileImg({ rank }: { rank: number }) {
  const [image, setImage] = useState(null)

  const importImage = async () => {
    try {
      /* @vite-ignore */
      const imageModule = await import(
        `../../../../packages/shared/assets/og/char_lv${rank}.png`
      )
      setImage(imageModule.default)
    } catch (error) {
      console.error('Error importing image:', error)
    }
  }

  useEffect(() => {
    importImage()
  }, [rank])

  return image ? (
    <img src={image} alt="A Spore" />
  ) : (
    <div className="font-title">Loading...</div>
  )
}
