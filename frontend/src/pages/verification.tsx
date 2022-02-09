import PageLoader from "../common/components/loaders/PageLoader";
import useVerification from "../features/verification/useVerification";

const VerificationPage = () => {
  const { isLoading } = useVerification();

  if (isLoading) {
    return <PageLoader />;
  }

  return <h1>Verification Page</h1>;
};

export default VerificationPage;
