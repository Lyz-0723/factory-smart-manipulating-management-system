import React, { useContext, useEffect } from "react";

import user_detail from "../../requests/user";
import { AppContext } from "../../App";

const Base = () => {
  let { user } = useContext(AppContext);

  return (
    <div>
      Successfully logged in.
      {user !== null && (
        <div style={{ border: "black solid 2px" }}>
          {user.user_name}
          <br />
          {user.company_info}
          <br />
          {user.contact_info}
          <br />
          {user.is_admin}
          <br />
          {user.user_id}
        </div>
      )}
    </div>
  );
};

export default Base;
