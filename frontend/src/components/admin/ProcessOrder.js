import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { getOrderDetails, updateOrder, clearErrors} from '../../actions/orderActions'
import Sidebar from './Sidebar'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'

const ProcessOrder = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, order } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.order)
    const [status, setStatus] = useState('');
    const orderId = match.params.id
    useEffect(() => {
        dispatch(getOrderDetails(orderId))
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(isUpdated){
        //   history.push('/admin/orders')
          alert.success('Order Updated Successully!')
          dispatch({ type: UPDATE_ORDER_RESET})
      }
        
    },[dispatch, error, alert, isUpdated, orderId])

    function updateOrderHandler(id){
        const formData = new FormData();
        formData.set('status',status)
        dispatch(updateOrder(id,formData));
    }
    const shippingDetails = shippingInfo &&  `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
    return (
        <Fragment>
        <MetaData title={`Process Order # ${order && order._id}`} />
        <div className="row">
             <div className="col-12 col-md-2">
                 <Sidebar />
            </div>
            <div className="col-12 col-md-10" style={{padding: '45px'}}>
                <Fragment>
                    {loading ? <Loader /> : (

                        <Fragment>
<div className="row d-flex justify-content-around">
                    <div className="col-12 col-lg-7 order-details">

                        <h2 className="my-5">Order # {order._id}</h2>

                        <h4 className="mb-4">Shipping Info</h4>
                        <p><b>Name:</b> {user && user.name}</p>
                        <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                        <p><b>Amount:</b> ${totalPrice}</p>

                        <hr />

                        <h4 className="my-4">Payment : <span className={isPaid ? "greenColor" : "redColor" }>{isPaid ? "PAID" : "NOT PAID" }</span></h4>
                        {/* <p className={isPaid ? "greenColor" : "redColor" }><b>{isPaid ? "PAID" : "NOT PAID" }</b></p> */}

                        <h4 className="my-4">Stripe ID : <span>{paymentInfo && paymentInfo.id}</span></h4>
                        {/* <p><b>{paymentInfo && paymentInfo.id}</b></p> */}


                        <h4 className="my-4">Order Status : <span className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor" }>{orderStatus}</span></h4>
                        {/* <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor" } ><b>{orderStatus}</b></p> */}

                        <h4 className="my-4">Order Items:</h4>

                        <hr />
                        <div className="cart-item my-1">
                        {orderItems && orderItems.map(item => (
                            <Fragment>
 <div key={item.product} className="cart-item my-1">
                            
                            <div className="row my-5">
                                <div className="col-4 col-lg-2">
                                <Link to={`/product/${item.product}`}><img src={item.image} alt={item.name} height="45" width="65" /></Link>
                                </div>

                                <div className="col-5 col-lg-5">
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>


                                <div className="col-3 col-lg-2 mt-4 mt-lg-0">
                                    <p>${item.price}</p>
                                </div>

                                <div className="col-12 col-lg-3 mt-4 mt-lg-0">
                                    <p className="text-center">{item.quantity} Piece(s)</p>
                                </div>
                            </div>
                           
                </div>
                     <hr />
                            </Fragment>
                           
                        ))}
                        </div>
                    </div>
					
					<div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e)=> setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
                                        Update Status
                                </button>
                                </div>
					
                </div>

                        </Fragment>
                        )}
                </Fragment>
                 
            </div>
        </div>
        
    </Fragment>
    )
}

export default ProcessOrder
