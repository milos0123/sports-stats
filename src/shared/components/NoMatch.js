import * as React from "react";
import { useLocation } from "react-router-dom";

const NoMatch = () => {
  const { state } = useLocation()
  
  return (
    <div className="no-match">
      <h1>{state?.slice(state.length - 3) || '404'}</h1>
      <p>{state?.slice(0, state.length - 3) || 'Nothing here, keep exploring!'}</p>
    </div>
  )

}

export default NoMatch