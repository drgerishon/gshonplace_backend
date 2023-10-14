
import Slider from '../../components/slider/Slider'
import '../../styles/Home.scss'
import HomeInfoBox from './HomeInfoBox'
import PropTypes from 'prop-types';
const PageHeading = ({heading, btnText}) => {
  return(
    <>
    <div className="--flex-between">
      <h2 className='--fw-thin'>{heading}</h2>
      <button className='--btn'>{btnText}</button>
    </div>
    <div className='--hr'></div>
    </>
  )
}
PageHeading.propTypes = {
  heading: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
};
const Home = () => {
  return (
    <>
       <Slider/>
       <section>
        <div className="container">
       <HomeInfoBox />
        <PageHeading heading={"Latest Products"} btnText={"Shop Now >>>"} />
        </div>
       </section>
    </>
  )
}

export default Home