import {useEffect, useRef} from 'react';

export default function useUnitChange(
  unit,
  recommendation,
  setRecommendation,
  setIntake,
  setHeight,
  setWeight,
) {
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    /* 
    Convert from metric to us-system on unit change;
    Update height from cm to in
    Update weight from kg to lbs
    */
    if (unit === 'us-system' && recommendation > 300) {
      setRecommendation(val => val / 30);
      setIntake(val => val / 30);
      setHeight(val => {
        const num = parseInt(val, 10) / 2.54;
        return Math.round(num).toString();
      });
      setWeight(val => {
        const num = parseInt(val, 10) / 0.453592;
        return Math.round(num).toString();
      });
      /* 
    Convert from us-system to metric on unit change;
    Update height from in to cm
    Update weight from lbs to kg
    */
    } else if (unit === 'metric' && recommendation < 300) {
      setRecommendation(val => val * 30);
      setIntake(val => val * 30);
      setHeight(val => {
        const num = parseInt(val, 10) * 2.54;
        return Math.round(num).toString();
      });
      setWeight(val => {
        const num = parseInt(val, 10) * 0.453592;
        return Math.round(num).toString();
      });
    }
  }, [unit]);
}
