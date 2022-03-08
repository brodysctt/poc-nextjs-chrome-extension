import { useState } from "react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [payUrl, setPayUrl] = useState<string | null>(null);

  const handleBuy = async () => {
    console.log("hi");
    const res = await fetch(
      "https://us-central1-kata-coinbase-commerce.cloudfunctions.net/createCharge"
      //"http://localhost:5001/kata-coinbase-commerce/us-central1/createCharge"
    );
    const data: any = await res.json();
    setPayUrl(data.hosted_url);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen min min-h-[200px] min-w-[200px] p-4">
      <p className="text-xl mb-6">ayyyy wuz good</p>
      <div className="h-1 p-2">
        {payUrl ? (
          <button
            className="text-white bg-green-500	 p-2 rounded-lg hover:p-3"
            onClick={() => window.open(payUrl)}
          >
            Pay with Coinbase
          </button>
        ) : (
          <button
            className="text-white bg-blue-600 p-2 rounded-lg hover:p-3"
            onClick={handleBuy}
          >
            Buy this
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
