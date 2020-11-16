import React from "react";

import Apollo from "./apollo";
import { AuthenticationProvider } from "./authentication";
export { useAuthentication } from "./authentication";

class Providers extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Apollo.Provider>
        <AuthenticationProvider>{children}</AuthenticationProvider>
      </Apollo.Provider>
    );
  }
}
export default Providers;
