import CustomerContactFields from "./CustomerContactFields";
import DeliveryAddressFields from "./DeliveryAddressFields";

export default function CustomerDetailsFields({ fieldErrors }) {
  return (
    <>
      <CustomerContactFields fieldErrors={fieldErrors} />
      <DeliveryAddressFields fieldErrors={fieldErrors} />
    </>
  );
}
