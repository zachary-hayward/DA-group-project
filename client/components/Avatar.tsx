import { ChangeEvent, useState } from "react"

interface AvatarProps {
  formImage: string
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | {target: {name:string, value:string}}) => void
}

export default function Avatar({formImage, handleChange}:AvatarProps) {
  const imageCount = 18
  const imageDisplay = 7
  const imageList = Array.from({length: imageCount}, (_,i) => `ava-${String(i+1).padStart(2,'0')}.png`)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      return Math.max(0, prevIndex-1)

    })
  }
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      return Math.min((imageCount - imageDisplay), prevIndex+1)
    })
  }

  return (
    <div className=''>
      <div className='flex flex-row justify-center'>
        <button onClick={(e) => {e.preventDefault(); handlePrevious()}} disabled={currentIndex === 0}
          className={`text-5xl ${currentIndex > 0 ? 'font-extrabold' : 'font-thin'}`}
          data-testid='prevButton'
        >
          &lt;
        </button>
        <div className=''>
          {imageList.slice(currentIndex, currentIndex + imageDisplay).map((image, i) => (
            <button key={i} data-testid={`button number ${1+i+currentIndex}`}
              onClick={(e) => {e.preventDefault(); handleChange({ target: { name: 'image', value: image } })}}
              className={`w-10 h-10 cursor-pointer
                ${formImage === image ? 'border-2 border-black rounded-full transform scale-110' : ''}`}
            >
              <img src={`/images/avatars/${image}`} alt={`Avatar number ${1 + i + currentIndex}`} />
            </button>
          ))}
        </div>
        <button onClick={(e) => {e.preventDefault(); handleNext()}} disabled={currentIndex === (imageCount - 5)}
          className={`text-5xl ${currentIndex < imageCount - imageDisplay ? 'font-extrabold' : 'font-thin'}`}
          data-testid='nextButton'
        >
          &gt;
        </button>
      </div>
    </div>
  )
}