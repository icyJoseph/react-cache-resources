import React, { useState, useEffect } from "react";
import { fetchWithCache } from "./fetchers";

export const FiberHoC = C => {
  function Node({ fallback, ...props }) {
    const [vNode, patch] = useState(null);
    useEffect(() => {
      try {
        const MaybeNode = C(props);
        patch(MaybeNode);
      } catch (e) {
        patch(fallback());
        fetchWithCache(e).then(() => {
          const MaybeNode = C(props);
          patch(MaybeNode);
        });
      }
    }, [props.query]);

    return vNode;
  }

  return props => <Node {...props} />;
};

export default FiberHoC;
