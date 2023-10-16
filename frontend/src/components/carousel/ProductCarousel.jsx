import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from './data';
import PropTypes from 'prop-types';


const ProductCarousel = ({ products }) => {
  return (
    <div>
      <Carousel
        showDots={false}
        responsive={responsive}
        infinite={true}
        // autoPlay={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        // customTransition="all .5"
        transitionDuration={1000}
      >
        {products}
      </Carousel>
    </div>
  );
};


ProductCarousel.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductCarousel;
