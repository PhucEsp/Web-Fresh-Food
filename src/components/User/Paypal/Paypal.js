import React, {useState, useEffect, useRef} from 'react'
import cartApi from '../../../api/CartApi';
import { useHistory } from 'react-router';

function Paypal(props) {
    const history = useHistory();
    const { dataOrder,total } = props
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();
    console.log(`dataOrder`, dataOrder)
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            description: 'Laptop store checkout',
                            amount: {
                                currency_code: 'USD',
                                value: total/1000,
                            }
                        }]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    try {
                        await cartApi.order(dataOrder)
                    } catch (error) {
                        console.log(`error.message`, error.message)
                    }
                    setPaidFor(true);
                    console.log('ORDER', order);
                },
                onError: err => {
                    setError(err);
                    console.error('ERROR', err);
                },
            })
            .render(paypalRef.current);
    }, [    ]);

    if (paidFor) {
        history.push("/home/dat-hang-thanh-cong");
    }

    if (error) {
        return (
            <div>
                <p>Rất tiếc, Quá trình thanh toán không thành công. Vui lòng liên hệ 1900000 để biết thêm chi tiết</p>
            </div>
        )
    }

    return (
        <div>
            <div>Tổng - {total}-vnđ</div>
            <div ref={paypalRef} />
        </div>
    )
}

export default Paypal
