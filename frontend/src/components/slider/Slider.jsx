import '../../styles/Slider.scss'
import { AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import {sliderData } from './slider-data'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Slider = () => {
    const [currentSlice, setCurrentSlide] = useState(0)
    const navigate = useNavigate()

    const slideLength = sliderData.length;
    const autoScroll = true;
    let slideInterval;
    const intervalTime = 5000 //5 sec

    const prevSlide = () => {
        setCurrentSlide( currentSlice === 0 ? slideLength -1 : currentSlice - 1)

    }
    const nextSlide = () => {
        setCurrentSlide( currentSlice === slideLength - 1 ? 0 : currentSlice + 1)
    }
//Slide to be at zero when refresh
    useEffect(() => {
        setCurrentSlide(0)
    }, [])

    useEffect(() => {
        if(autoScroll) {
            const auto = () => {
                slideInterval  = setInterval(nextSlide, intervalTime)
            }
            auto()
        }
        return () => clearInterval(slideInterval)
    }, [currentSlice, intervalTime, autoScroll])
  return (
    <div className="slider">
        <AiOutlineArrowLeft  className='arrow prev' onClick={prevSlide}/>
        <AiOutlineArrowRight  className='arrow next' onClick={nextSlide}/>
   
        {sliderData .map((slide, index) => {
             const { image, heading, desc} = slide;

             return(
                <div key={index} className={index === currentSlice ? "slide current" : "slide"}>
                    {index === currentSlice && (
                        <>
                            <img src={image} alt='slide' />
                            <div className="content">
                                <span className="span1"></span>
                                <span className="span2"></span>
                                <span className="span3"></span>
                                <span className="span4"></span>

                                <h>{heading}</h>
                                <p>{desc}</p>
                                <hr />
                                <button className='--btn --btn-primary' onClick={() => navigate('/shop')}>Shop Now</button>
                            </div>
                        </>
                    )}
                </div>
             )
        })}
    </div>
  )
}

export default Slider