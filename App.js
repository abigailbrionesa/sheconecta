import Navigation from "./app/infraestructure/Navigation";

export default function App() {
  const [fontsLoaded] = useFonts({
    "AbhayaLibre-Bold": require("./assets/fonts/AbhayaLibre-Bold.ttf"),
    "AbhayaLibre-ExtraBold": require("./assets/fonts/AbhayaLibre-ExtraBold.ttf"),
    "AbhayaLibre-Medium": require("./assets/fonts/AbhayaLibre-Medium.ttf"),
    "AbhayaLibre-Regular": require("./assets/fonts/AbhayaLibre-Regular.ttf"),
    "AbhayaLibre-SemiBold": require("./assets/fonts/AbhayaLibre-SemiBold.ttf"),
  });

  if (!fontsLoaded || initializing) {
    return null;
  }

  return (
    <>
      <Navigation />
    </>
  );
}
