import { Link } from 'react-router-dom';
import '../../styles/Carousel.scss';
import { shortenText } from '../../utils';
import PropTypes from 'prop-types';



const CarouselItem = ({url, name, price, description}) => {

  return (
    <div className='carouselItem'>
        <Link to="/product-details">
            <img className='product--image' src={url} alt='product'/>
            <p className='price'>{`ksh ${price}`}</p>
            <h4>{shortenText(name, 18) }</h4>
            <p className='--mb'>{shortenText(description, 26) }</p>
        </Link>
        <button className='--btn --btn-primary --btn-block'>Add to Cart</button>
    </div>
  )
}


CarouselItem.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  };

export default CarouselItem