import { useEffect, useRef } from "react";

export default function RazorpayButton() {
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        // Required because React won't run scripts in JSX
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.async = true;
        // script.dataset.payment_button_id = "pl_RqD7yEnHSOm66W";
        script.dataset.payment_button_id = "pl_RqBoEgCUoCwlvP";

        if (formRef.current) {
            formRef.current.appendChild(script);
        }
    }, []);

    return (
        <form ref={formRef}></form>
    );
}
