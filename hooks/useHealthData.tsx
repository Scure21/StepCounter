import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
} from "react-native-health";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};

const useHealthData = (date: Date) => {
  const [hasPermissions, setHasPermission] = useState(false);
  const [steps, setSteps] = useState(0);
  const [flights, setFlights] = useState(0);
  const [distance, setDistance] = useState(0);

  // iOS - HealthKit
  useEffect(() => {
    if (Platform.OS !== "ios") {
      return;
    }

    AppleHealthKit.isAvailable((err, isAvailable) => {
      if (err) {
        console.log("Error checking availability");
        return;
      }

      if (!isAvailable) {
        console.log("Apple Health not available");
        return;
      }

      AppleHealthKit.initHealthKit(permissions, (err) => {
        if (err) {
          console.log("Error getting permissions");
          return;
        }
        setHasPermission(true);
      });
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) {
      return;
    }

    const options: HealthInputOptions = {
      date: date.toISOString(),
      includeManuallyAdded: false,
    };

    // Steps count
    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log("Error getting the steps");
        return;
      }
      setSteps(results.value);
    });

    // Flights Climbed
    AppleHealthKit.getFlightsClimbed(options, (err, results) => {
      if (err) {
        console.log("Error getting the steps:", err);
        return;
      }
      setFlights(results.value);
    });

    // Distance
    AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
      if (err) {
        console.log("Error getting the steps:", err);
        return;
      }
      setDistance(results.value);
    });
  }, [hasPermissions, date]);

  return {
    steps: steps.toFixed(0),
    flights,
    distance,
  };
};

export default useHealthData;
