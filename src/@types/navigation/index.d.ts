// declare namespace ReactNavigation {
//   export interface RootParamList {
//     Home: undefined;
//     CarDetails: car;
//     Scheduling: car;
//     SchedulingDetails: { 
//       car, 
//       dates: string[] 
//     };
//     Confirmation: { 
//       nextScreenRoute: string; 
//       title: string; 
//       message: string; 
//     };
//     MyCars: undefined;
//     SignUpFirstStep: undefined;
//     SignUpSecondStep: { 
//       user: { 
//         name: string; 
//         email: string; 
//         driverLicense: string; 
//       }; 
//     };
//   }
// }

declare namespace ReactNavigation {
  export interface RootParamList extends RootStackParamList {
    Home: NavigationStackProp<string, CarDTO>;
    CarDetails: NavigationStackProp<string, CarDTO>;
    Scheduling: NavigationStackProp<string, CarDTO>;
    SchedulingDetails: NavigationStackProp<string, CarDTO>;
    Confirmation: NavigationStackProp<string, CarDTO>;
    MyCars: NavigationStackProp<string, CarDTO>;
    SignIn: NavigationStackProp<string, string>;
    SignUpFirstStep: NavigationStackProp<string, string>;
    SignUpSecondStep: NavigationStackProp<string, string>;
  }
}