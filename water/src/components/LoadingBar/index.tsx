import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles.css';

export const LoadingBar: React.FC = () => {
  const [isIn, setIsIn] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsIn(true), 10);

    return () => timeout && clearTimeout(timeout);
  }, []);

  return (
    <CSSTransition
      classNames="loading-bar-transition"
      in={isIn}
      timeout={isIn ? 600 : 1100}
      onEntered={() => setIsIn(false)}
      onExited={() => setIsIn(true)}>
      <div className="loading-bar" onClick={() => setIsIn(!isIn)}>&nbsp;</div>
    </CSSTransition>
  );
}
