import { ChangeEvent, useState } from "react"

interface AvatarProps {
  formImage: string
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

export default function Avatar({formImage, handleChange}:AvatarProps) {
  const imageCount = 18
  const imageDisplay = 7
  const imageList = Array.from({length: imageCount}, (_,i) => `ava-${String(i+1).padStart(2,'0')}.png`)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) return prevIndex - 1
      return prevIndex
    })
  }
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < (imageCount - imageDisplay)) return prevIndex + 1
      return prevIndex
    })
  }

  return (
    <div className=''>
      <span className=''>Avatar:</span>
      <div className='flex flex-row'>
        <button onClick={(e) => {e.preventDefault(); handlePrevious()}} disabled={currentIndex === 0}
          className='text-5xl font-extrabold'
        >
          &lt;
        </button>
        <div className=''>
          {imageList.slice(currentIndex, currentIndex + imageDisplay).map((image, i) => (
            <button key={i} 
              onClick={(e) => {e.preventDefault(); handleChange({ target: { name: 'image', value: image } })}}
              className={`w-10 h-10 cursor-pointer
                ${formImage === image ? 'border-2 border-black rounded-full transform scale-110' : ''}`}
            >
              <img src={`/images/avatars/${image}`} alt={`Avatar number ${currentIndex + i}`} />
            </button>
          ))}
        </div>
        <button onClick={(e) => {e.preventDefault(); handleNext()}} disabled={currentIndex === (imageCount - 5)}
          className='text-5xl font-extrabold'
        >
          &gt;
        </button>
      </div>
    </div>
  )
}