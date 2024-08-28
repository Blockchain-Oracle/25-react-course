import "./rippleButtonEffects.css";
import { useState, useCallback } from "react";

export default function RippleButtonEffects({ onButtonClick }) {
  const [ripples, setRipples] = useState([]);

  const addRipple = useCallback(
    (e) => {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = { x, y, id: Date.now() };

      setRipples((prevRipples) => [...prevRipples, ripple]);

      setTimeout(() => {
        setRipples((prevRipples) =>
          prevRipples.filter((r) => r.id !== ripple.id)
        );
      }, 800);

      // Propagate the click event to the parent with button coordinates
      onButtonClick(e, rect.left + x, rect.top + y);
    },
    [onButtonClick]
  );

  return (
    <div className="ripple-button-container">
      <h1>Ripple Button Effects</h1>
      <button onClick={addRipple} className="ripple-button">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple-effect"
            style={{
              top: ripple.y,
              left: ripple.x,
            }}
          />
        ))}
        Click Me To see the effect
      </button>
    </div>
  );
}
