import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  status: "idle" | "loading" | "error" | "success";
}

const defaultState: State<null> = {
  data: null,
  error: null,
  status: "idle",
};

export const useAsync = <D>(initState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initState,
  });
  const setData = (data: D) => {
    setState({
      data,
      status: "success",
      error: null,
    });
  };

  const setError = (error: Error) => {
    setState({
      data: null,
      error: error,
      status: "error",
    });
  };

  const setLoading = () => {
    setState({
      data: null,
      error: null,
      status: "loading",
    });
  };

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 promise 类型数据");
    }
    setLoading();
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((err) => {
        setError(err);
      });
  };
  return {
    isIdle: state.status == "idle",
    isLoading: state.status == "loading",
    isError: state.status == "error",
    isSuccess: state.status == "success",
    run,
    setData,
    setLoading,
    setError,
    ...state,
  };
};
