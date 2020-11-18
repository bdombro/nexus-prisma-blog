import React from "react";
import usePortal from "react-useportal/dist/usePortal";

export class ErrorBoundary extends React.Component<{ showBack?: boolean }> {
  state: {
    error: any;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so next render shows fallback UI.
    return { error };
  }

  componentDidCatch(error: any) {
    // TODO: Send error to server
    this.setState({ error });
  }

  render() {
    const { showBack, children } = this.props;
    const { error } = this.state;
    if (error) {
      return <ErrorMessageWithPortal error={error} showBack={showBack} />;
    }
    return children;
  }
}

const ErrorMessageWithPortal = ({ error, showBack }: { error: any; showBack?: boolean }) => {
  const stackHtml = error?.stack.replace(/\\n/g, "<br />");
  const [openPortal, closePortal, isOpen, Portal] = usePortal({
    bindTo: document.getElementById("portalRoot") || undefined,
    closeOnOutsideClick: true,
    closeOnEsc: true,
  });
  return (
    <div>
      <p>Uh oh, something went wrong. {showBack && <a href="/">Go home?</a>}</p>
      <p>
        <button onClick={openPortal}>Click for More Info</button>
      </p>
      {isOpen && (
        <Portal>
          <div style={{ background: "#aaa", padding: 20 }}>
            <button onClick={closePortal} style={{ float: "right" }}>
              Close (X)
            </button>
            <p>We automatically reported this issue. Bellow is the raw error if you're interested.</p>
            <pre style={{ background: "#ccc", padding: 20, overflowX: "scroll" }}>
              Message: {error?.message}
              <div dangerouslySetInnerHTML={{ __html: stackHtml }} />
            </pre>
          </div>
        </Portal>
      )}
    </div>
  );
};
