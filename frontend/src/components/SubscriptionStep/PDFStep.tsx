import { SubscriptionFormData } from "../../interfaces/subscriptions";

type PDFStepProps = {
  subscription: SubscriptionFormData;
};

function PDFStep(props: PDFStepProps) {
  const { subscription } = props;
  return <div>PDFStep</div>;
}

export default PDFStep;
