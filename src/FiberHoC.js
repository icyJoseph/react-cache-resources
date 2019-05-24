import React, { useState, useEffect } from "react";

// naive Fiber implementation
export const FiberHoC = C => {
  function Node({ fallback, ...props }) {
    const [vNode, patch] = useState(null);

    useEffect(() => {
      let cancel = false;
      try {
        const MaybeNode = C(props);
        patch(MaybeNode);
      } catch (e) {
        patch(fallback);
        e.then(() => {
          if (!cancel) {
            const MaybeNode = C(props);
            patch(MaybeNode);
          }
        }).catch(() => patch(fallback));
      }

      return () => {
        cancel = true;
        console.log("clean up");
      };
    }, [props.query]);

    return vNode;
  }

  return props => <Node {...props} />;
};

export default FiberHoC;
