import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import { getAdminProducts, clearErrors} from '../../actions/productActions'
import { allOrders, clearErrors as clearErrorsOrder} from '../../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { allUsers } from '../../actions/userActions'
const Dashboard = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading , error, products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, loading: allOrdersLoading } = useSelector(state => state.allOrders)
    // const [data, setData]= useState(setOrders())
    let outOfStockProducts = 0;
    products.forEach(c => {
        if(products.stock === 0){
            outOfStockProducts += 1
        }
    })
    useEffect(()=>{
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    },[dispatch, alert, error])
    return (
        <Fragment>
            <div className="row">
                    <div className="col-12 col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-md-10">
                        <br />
                    <h1 className="my-4 animate__animated animate__fadeIn" style={{display: 'block',margin: 'auto'}}>لوحة التحكم</h1>
                    <hr />
                    <br />
                    {loading ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'لوحة التحكم'} />
                            <div className="row animate__animated animate__fadeIn animate__delay-1s">
                                <div className="col-xl-12 col-sm-12 mb-3" style={{padding: '0px 65px'}}>
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">المجموع 
                                                <br /> 
                                                <b>
                                                     {totalAmount && totalAmount.toFixed(2)}
                                                </b>
                                                <br /> 
                                                <b>
                                                     EGP
                                                </b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row  animate__animated animate__fadeIn animate__delay-2s" style={{padding: '0px 50px'}}>
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">المنتجات<br /> <b>{products && products.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">عرض التفاصيل</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">الأوردرات<br /> <b>{orders && orders.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">عرض التفاصيل</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">المستخدمين<br /> <b>{users && users.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">عرض التفاصيل</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <br />
                                            <div className="text-center card-font-size">منتج غير متوفر <br /> <b>{outOfStockProducts}</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                        

                    )}
                            
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard
