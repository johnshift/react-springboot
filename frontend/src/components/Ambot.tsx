import axios from "axios";
import useSWR from "swr";

type ResponseData = {
  msg: string;
};

type ResponseError = {
  errormsg: string;
};

const fetcher = (url: string) =>
  axios.get<ResponseData>(url).then((res) => res.data);

const Ambot = () => {
  const { data, error } = useSWR<ResponseData, ResponseError>(
    "/ambot",
    fetcher
  );

  return (
    <>
      <p data-testid="txt">{data ? data.msg : "Loading"}</p>
    </>
  );
};

export default Ambot;
