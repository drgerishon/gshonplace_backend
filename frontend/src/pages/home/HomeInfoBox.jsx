import { FaShippingFast } from 'react-icons/fa'
import { BsCartCheck, BsClockHistory, BsFillCreditCardFill } from 'react-icons/bs'

const data = [
    {
      icon: <FaShippingFast size={30} color='#8cb4f5'/>,
      heading: "Free shipping",
      text: "We offer free shipping on special products",
    },
    {
      icon: <BsFillCreditCardFill size={30} color='#f7d272'/>,
      heading: "Secure Payment",
      text: "We secure payment for you product",
    },
    {
      icon: <BsCartCheck size={30} color='#82fa9e'/>,
      heading: "Quality Products",
      text: "We sell products from only tested and proven brands",
    },
    {
      icon: <BsClockHistory size={30} color='#82fa9e'/>,
      heading: "24/7 Support",
      text: "Get access to support from our expert support team",
    },
  ]
const HomeInfoBox = () => {
  return (
    <div className='infoboxes --mb2'>
        {data.map((item, index) => {
            const { icon, heading, text } = item;
            return (
                <div key={index} className='infobox'>
                    <div className='icon'>{icon}</div>
                    <div className='text'>
                        <h4>{heading}</h4>
                        <p className='--text-sm'>{text}</p>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default HomeInfoBox