import { useEffect, useRef } from "react";

function useCloseModal(handler) {
  const ref = useRef();

  useEffect(() => {
    function callBack(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", callBack, true);
    return () => {
      document.removeEventListener("click", callBack, true);
    };
  }, [handler]);

  return ref;
}

export default useCloseModal;
