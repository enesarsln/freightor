import { useState, useEffect } from 'react';
import './appStyle.css';
import Label from 'src/components/label';

const WeightDisplay = ({ weight, extraWeight, seconds }: any) => {
  const [displayWeight, setDisplayWeight] = useState(weight);
  const [fade, setFade] = useState(true);
  const [showExtraWeight, setShowExtraWeight] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExtraWeight(true);

      setTimeout(() => {
        setFade(false);
        setTimeout(() => {
          setDisplayWeight((prevWeight: any) => prevWeight + extraWeight);
          setFade(true);
          setShowExtraWeight(false);
        }, 500);
      }, 200);
    }, seconds * 1000);

    return () => clearTimeout(timer);
  }, [extraWeight, seconds]);

  return (
    <>
      {displayWeight !== 0 && (
        <>
          <Label
            className={`weight-display ${fade ? 'visible' : 'hidden'}`}
            variant="soft"
            color="info"
            sx={{ p: 2 }}
          >
            {displayWeight}
          </Label>

          {showExtraWeight && (
            <Label
              className={`weight-display ${fade ? 'visible' : 'hidden'}`}
              variant="soft"
              color="success"
              sx={{ p: 2, ml: 1 }}
            >
              {extraWeight}
            </Label>
          )}
        </>
      )}
    </>
  );
};

export default WeightDisplay;
