import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ packageData }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const totalPrice = packageData.price;
    const navigate = useNavigate();

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    if (res.data.clientSecret) {
                        setClientSecret(res.data.clientSecret);
                    } else {
                        setError('Failed to create payment intent');
                    }
                })
                .catch(err => {
                    console.error(err);
                    setError('An error occurred while creating payment intent');
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (paymentMethodError) {
            console.log('payment error', paymentMethodError);
            setError(paymentMethodError.message);
            return;
        } else {
            console.log('payment method', paymentMethod);
            setError('');
        }

        if (!clientSecret) {
            setError('Invalid client secret');
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('confirm error', confirmError);
            setError(confirmError.message);
        } else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thank you for the Payment",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/addemployee', { state: { packageLimit: packageData.employee } });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Helmet>
                <title>
                    Payment
                </title>
            </Helmet>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-md px-8 text-2xl font-semibold py-2 bg-lime-200 my-4" type="submit" disabled={!stripe}>
                Pay {totalPrice} $ 
            </button>
            <p className="text-red-600 text-2xl font-semibold">{error}</p>
            {transactionId && <p className= "text-xl font-semibold text-green-600">Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckOutForm;
