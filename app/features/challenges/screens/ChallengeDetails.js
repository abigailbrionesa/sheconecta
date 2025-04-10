import React from "react";
import { View, Text } from "react-native";
import { ImageBackground } from "react-native";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { fontStyle } from "../../../utils/fontStyle";
import Button1 from "../../welcome/components/Button1"
export const ChallengeDetails = ({ route }) => {
  const { challenge } = route.params;
  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={{ padding: 20 }}>
        <Text style={[fontStyle.h3]}>{challenge.nombre}</Text>
        <Text style={[fontStyle.p]}>Categoria: {challenge.categoria}</Text>
        <Text style={[fontStyle.p]}>Objetivo: {challenge.objetivo}</Text>
        <Text style={[fontStyle.p]}>Tarea: {challenge.tarea}</Text>
        <Text style={[fontStyle.p]}>Validación: {challenge.validacion}</Text>
        <Text style={[fontStyle.p]}>Puntos: {challenge.puntos} puntos</Text>
        <Button1>Validar</Button1>
      </View>
    </ImageBackground>
  );
};
