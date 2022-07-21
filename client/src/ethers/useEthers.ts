import { useEffect, useRef, useState } from "react";
import { ethers, Contract } from "ethers";
import { address, abi, privateKey } from "./config";

const useEffectOnceImplement: typeof useEffect = (effect, deps?) => {
  useEffect(() => {
    let ready = true;
    let destructor: void | (() => void);

    queueMicrotask(() => {
      if (ready) {
        destructor = effect();
      }
    });

    return () => {
      ready = false;
      destructor?.();
    };
  }, deps);
};

const useEffectOnce =
  process.env.NODE_ENV === "production" ? useEffect : useEffectOnceImplement;

// =======================================

const createContract = (): Contract => {
  const provider = ethers.getDefaultProvider("http://127.0.0.1:8545");

  const wallet = new ethers.Wallet(privateKey, provider);

  const cont = new ethers.Contract(
    address,
    abi
    // provider
  );
  return cont.connect(wallet);
};

export const useEthers = () => {
  const [value, setValue] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { current: cont } = useRef(createContract());

  const say = async () => {
    const res = await cont.say();
    console.log(res);
    setValue(res);
  };

  const listen = async (arg: string) => {
    const res = await cont.listen(arg);

    setLoading(true);
    await res.wait();

    setLoading(false);
  };

  useEffectOnce(() => {
    say();
  }, []);

  return {
    value,
    listen,
    say,
    loading,
  };
};
