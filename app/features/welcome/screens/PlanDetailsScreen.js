import React from "react";
import { View, Text, Button, ImageBackground } from "react-native";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { fontStyle } from "../../../utils/fontStyle";
import Button1 from "../components/Button1";
const PlanDetailsScreen = ({ route, navigation }) => {
  const { plan } = route.params;

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={[backgroundStyle.background, {justifyContent: "center"}]}
    >
      <View
        style={{
          padding: 20,
          margin: 30,
          borderRadius: 15,
          justifyContent: "space-between",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          alignContent: "center",
          alignItems: "center",
          gap:15,
        }}
      >
        <View style={{ gap: 15, marginBottom:10 }}>

          <Text style={[fontStyle.h2, fontStyle.darker]}>{plan.name}</Text>

          <Text
            style={[
              fontStyle.h4,
              fontStyle.light,
              {
                backgroundColor: "#c2a4ce",
                alignSelf: "center",
                borderRadius: 15,
                padding: 10,
              },
            ]}
          >
            {plan.price}
          </Text>
          <Text style={[fontStyle.h4, fontStyle.pink]}>Características:</Text>
          {plan.features.map((feature, index) => (
            <Text key={index} style={[fontStyle.p, fontStyle.dark]}>
              • {feature}
            </Text>
          ))}
        </View>
        <Button1 onPress={() => navigation.goBack()}>
          Volver a los planes
        </Button1>
      </View>
    </ImageBackground>
  );
};

export default PlanDetailsScreen;
