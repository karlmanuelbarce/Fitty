import { NavigatorScreenParams } from "@react-navigation/native";

// Define the structure of a single activity object from your exercises.json
export interface Activity {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}

// Define the parameters for each screen in the auth flow
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

// Define the parameters for each screen in the main bottom tab navigator
export type MainTabsParamList = {
  Home: undefined;
  Record: undefined;
  Profile: undefined;
};

// Define the parameters for the root stack navigator that contains everything
export type RootStackParamList = {
  // This screen is the entire tab navigator, and we define its own parameters
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
  // This screen expects an 'exercise' object to be passed to it when navigated to
  ExerciseDetail: { exercise: Activity };
};
