import { h } from "preact";
import Button from "../../components/button";

const Page = () => {
  return (
    <div>
      <Button onClick={() => console.log("gwapo")}>XXX</Button>
    </div>
  );
};

export default Page;
