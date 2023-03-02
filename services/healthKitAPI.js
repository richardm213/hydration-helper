import AppleHealthKit from 'react-native-health';

class HealthData {
  options = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
        AppleHealthKit.Constants.Permissions.Sodium,
        AppleHealthKit.Constants.Permissions.AppleExerciseTime,
        AppleHealthKit.Constants.Permissions.BasalEnergyBurned,
      ],
    },
    startDate: new Date(2020, 1, 1).toISOString(),
  };

  constructor() {
    AppleHealthKit.initHealthKit(this.options, error => {
      if (error) console.log('[ERROR] Cannot grant permissions!');
    });
  }

  calorieIntake() {
    const activeCalories = AppleHealthKit.getActiveEnergyBurned(
      this.options,
      (err, results) => {
        if (err) {
          return 0;
        }
        return results;
      },
    );

    const basalCalories = AppleHealthKit.getBasalEnergyBurned(
      this.options,
      (err, results) => {
        if (err) {
          return 0;
        }
        return results;
      },
    );

    return activeCalories + basalCalories;
  }

  exerciseTime() {
    const activitySummary = AppleHealthKit.getActivitySummary(
      this.options,
      (err, results) => {
        if (err) {
          return {};
        }
        return results;
      },
    );

    if ('appleExerciseTime' in activitySummary) {
      return activitySummary.appleExerciseTime;
    }

    return 'no exercise time found';
  }
}

export default HealthData;
