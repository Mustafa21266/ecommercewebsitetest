import React, { Fragment, useState ,useEffect } from 'react'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import  Pagination  from 'react-js-pagination'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
let Carousel = require('react-responsive-carousel').Carousel;
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const Home = ( { match } ) => {
  const [currentPage, setcurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const categories = [
    'Electronics',
                'Cameras',
                'Laptop',
                'Accessories',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Sports',
                'Home',
  ]
  const dispatch = useDispatch();
  const { loading, products, error, productsCount, resultsPerPage, filteredProductsCount } = useSelector(state => state.products)
  const alert = useAlert()
  const keyword = match.params.keyword
  useEffect(() => {
    if(error){
      return alert.error(error)
    }
    dispatch(getProducts(keyword,currentPage,price,category, rating));
    
  }, [dispatch, alert,error,keyword, currentPage,price,category, rating])
  function setCurrentPageNo(pageNumber){
    setcurrentPage(pageNumber)
  }
  let count = productsCount;
  if(keyword){
    count = filteredProductsCount;
  }
    return (
        <Fragment>
          { loading ? <Loader /> : (
            <Fragment>
            <MetaData title={`Buy Best Products Online`}/>
            {!keyword && (
    <div className="row">
    <div className="col-12 animate__animated animate__backInRight">
      <img className="img-fluid w-100" src="./images/front-view-woman-with-shopping-bag-concept.jpg" alt="homepage picture" />
      <div style={{position: 'absolute',bottom: '10px',left: '30px'}}>
      <h1 style={{width: "16rem",marginLeft: '10px'}} >High Quality, Best prices</h1>
      <Link to={'/search/all'} className="btn btn-primary" style={{width: "14rem"}}>Browse All Products</Link>
      </div>
      
    </div>
</div>
            )}
        
            <h1 id="products_heading">Latest Products</h1>

<section id="products" className="container mt-5">
  <div className="row">
    {keyword ? (
      <Fragment>
        <div className="col-12 col-md-3 mt-5 mb-5">
              <div className="px-5">
                <Range 
                marks={{
                  1 : `$1`,
                  1000: `$1000`
                }}
                min={1}
                max={1000}
                defaultValue={[1,1000]}
                tipFormatter={value => `$${value}`}
                tipProps={{
                  placement: "top",
                  visible: true
                }}
                value={price}
                onChange={price => setPrice(price)}
                />
                <hr className="my-5" />
                <div className="mt-5"> 
                  <h4 className="mb-3">
                    Categories
                  </h4>
                  <ul className="pl-0">
                    {categories.map(category => (
                    <li style={{ cursor: 'pointer',listStyleType: 'none'}}
                    key={category}
                    onClick={ () => setCategory(category) }
                    >{category}</li>
                    ))}
                  </ul>
                </div>

                <hr className="my-3" />
                <div className="mt-5"> 
                  <h4 className="mb-3">
                    Ratings
                  </h4>
                  <ul className="pl-0">
                    {[5,4,3,2,1].map(star => (
                    <li style={{ cursor: 'pointer',listStyleType: 'none'}}
                    key={star}
                    onClick={ () => setRating(star) }
                    >
                      <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${star  * 20}%`}}>

                              </div>
                      </div>
                    </li>
                    ))}
                  </ul>
                </div>


              </div>
        </div>
        <div className="col-12 col-md-9 animate__animated animate__fadeIn">
        <div className="row">
        {products.map(product => (
        <Product  key={product._id} product={product}  col={4}/>
      ))}
        </div>
        {resultsPerPage <= count && (
  <div className="d-flex justify-content-center mt-5">
<Pagination
          activePage={currentPage}
          itemsCountPerPage={resultsPerPage}
          totalItemsCount={count}
          onChange={setCurrentPageNo}
          nextPageText={'Next'}
          prevPageText={'Previous'}
          firstPageText={'First'}
          lastPageText={'Last'}
          itemClass="page-item"
          linkClass="page-link"
        />
</div>
)}
        </div>
        
      </Fragment>
    ) : (
      <Fragment>

<div className="col-12 animate__animated animate__backInUp">
<Carousel autoPlay showArrows={true} width="100%" showArrows={true} infiniteLoop={true}>
      
  <div>
  {products.slice(0, 4).map((product,index) => (
    <Fragment>
<Product key={product._id} product={product}  col={3}/>
    </Fragment>

          ))}
           </div>
           <div>
  {products.slice(4, 8).map((product,index) => (
    <Fragment>
<Product key={product._id} product={product}  col={3}/>
    </Fragment>

          ))}
           </div>
           <div>
  {products.slice(8, 12).map((product,index) => (
    <Fragment>
<Product key={product._id} product={product}  col={3}/>
    </Fragment>

          ))}
           </div>
               </Carousel>
</div>
  
          </Fragment>
    )}
    
    

  </div>
</section>



</Fragment>
          )}
            
        </Fragment>
    )
}

export default Home
