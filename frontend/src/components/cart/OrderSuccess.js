import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
const OrderSuccess = () => {
    return (
        <Fragment>
            <MetaData title={'Order Success'} />
            <div className="row justify-content-center animate__animated animate__fadeIn">
            <div className="col-6 mt-5 text-center">
                <img className="my-5 img-fluid d-block mx-auto animate__animated animate__flash animate__delay-2s" src="https://freepngimg.com/thumb/success/6-2-success-png-image.png" alt="Order Success" width="200" height="200" />

                <h2 style={{textAlign: 'center'}}>تم تأكيد طلبك بنجاح</h2>

                <Link to={"/orders/me"}>طلباتي</Link>
            </div>

        </div>
        </Fragment>
    )
}

export default OrderSuccess
