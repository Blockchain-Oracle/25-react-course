import "./App.css";
import RippleButtonEffects from "./components/RippleButtonEffects";
import { useState, useCallback } from "react";

function App() {
  const [backgroundRipples, setBackgroundRipples] = useState([]);

  const addBackgroundRipple = useCallback((e, x, y) => {
    const ripple = { x, y, id: Date.now() };

    setBackgroundRipples((prevRipples) => [...prevRipples, ripple]);

    setTimeout(() => {
      setBackgroundRipples((prevRipples) =>
        prevRipples.filter((r) => r.id !== ripple.id)
      );
    }, 1000);
  }, []);

  return (
    <div id="root" className="app-container">
      {backgroundRipples.map((ripple) => (
        <span
          key={ripple.id}
          className="background-ripple"
          style={{
            top: ripple.y,
            left: ripple.x,
          }}
        />
      ))}
      <RippleButtonEffects onButtonClick={addBackgroundRipple} />
    </div>
  );
}

export default App;
