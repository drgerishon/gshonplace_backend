import { useNavigate } from 'react-router-dom';
import '../../styles/ProductCategory.scss';
import PropTypes from 'prop-types';

const categories = [
  {
    id: 1,
    title: 'Gadgets',
    image: 'https://i.ibb.co/G5Vkd3m/c1.jpg',
  },
  {
    id: 2,
    title: 'Women Fashon',
    image: 'https://i.ibb.co/nQKLjrW/c2.jpg',
  },
  {
    id: 3,
    title: 'Sport Sneakers',
    image: 'https://i.ibb.co/fNkBYgr/c3.jpg',
  },
];

const Category = ({ title, image }) => {
  const navigate = useNavigate();

  return (
    <div className="category">
      <h3>{title}</h3>
      <img src={image} alt="" />
      <button className="--btn" onClick={() => navigate('/shop')}>
        {'Show Now>>>'}
      </button>
    </div>
  );
};

Category.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
const ProductCategory = () => {
  return (
    <div className="categories">
      {categories.map((cat) => (
        <div key={cat.id} className='--flex-center'>
          <Category title={cat.title} image={cat.image} />
        </div>
      ))}
    </div>
  );
};

export default ProductCategory;
