import { useEffect, useState } from "react";
import store from "../app/store";

const useCreateOptions = (defaultOptions, listenValue) => {
  const [options, setOptions] = useState(defaultOptions);

  const changeOptions = (data) => {
    if (Array.isArray(data)) {
      setOptions(data);
      return;
    }

    const optionIndex = options.findIndex((option) => option.id === data.id);

    if (optionIndex > -1) {
      setOptions(
        options.map((option, index) => (index === optionIndex ? data : option))
      );
    } else {
      setOptions([data, ...options]);
    }
  };

  useEffect(
    () =>
      store.subscribe(() => {
        setOptions(store.getState().tags[listenValue]);
      }),
    []
  );

  return [options, changeOptions];
};

export default useCreateOptions;
