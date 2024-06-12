import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { AuthContext } from "../Providers/AuthProviders";

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const packages = [
        { id: 1, members: 5, price: 5 },
        { id: 2, members: 10, price: 8 },
        { id: 3, members: 20, price: 15 }
    ];
    const price = packages.price;

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('Payment Error', error);
        }
        else {
            console.log('Payment method', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email || 'Anonymous',
                    name: user.displayName || 'Anonymous'
                }
            }
        });

        if(confirmError){
            console.log('Confirm Error');
        }
        else{
            console.log(paymentIntent);
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                <button className="my-8 text-2xl font-semibold" type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckOutForm;