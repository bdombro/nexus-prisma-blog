import React from "react";
import usePortal from "react-useportal/dist/usePortal";

const Component: React.FC = () => {
  const [openPortal, closePortal, isOpen, Portal] = usePortal({
    bindTo: document.getElementById("portalRoot") || undefined,
    closeOnOutsideClick: true,
    closeOnEsc: true,
  });
  return (
    <div>
      <p>
        <button onClick={openPortal}>Click to open portal</button>
      </p>
      {isOpen && (
        <Portal>
          <div style={{ background: "#aaa", padding: 20 }}>
            <button onClick={closePortal} style={{ float: "right" }}>
              Close (X)
            </button>
            <p>Hello, Portal!</p>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default Component;
