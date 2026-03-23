import { PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalButton({ amount, currency }) {
  return (
    <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount,
                currency_code: currency,
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          alert("Payment successful by " + details.payer.name.given_name);
        });
      }}
      onError={(err) => {
        console.error(err);
        alert("Payment failed");
      }}
    />
  );
}