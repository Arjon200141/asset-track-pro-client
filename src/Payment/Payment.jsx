import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const Payment = () => {
    const stripePromise = loadStripe('pk_test_51PQkr9DcLfNezDuz0cS6MYY0n1aw9pnt9OUwsiq9gJxC74GPTDgdttxslveH6Q1tOAlhpaVW4em55He0t29WmphP00jnmiwCMG');
    console.log(stripePromise);
    return (
        <div className="mx-40 my-12">
            <h2 className="text-4xl font-semibold text-center my-12">Payment</h2>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;