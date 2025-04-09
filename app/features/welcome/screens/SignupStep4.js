import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";
import { fontStyle } from "../../../utils/fontStyle";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";
import DropDownPicker from "react-native-dropdown-picker";
import { departments } from "../../../utils/geographyPeru";

const SignupStep4 = ({ navigation }) => {
  const route = useRoute();
  const [departamento, setDepartamento] = useState(null);
  const [provincia, setProvincia] = useState(null);
  const [openDepartment, setOpenDepartment] = useState(false);
  const [openProvince, setOpenProvince] = useState(false);

  const { email, password, firstName, lastName, birthDate, role } =
    route.params;

  const goToStep5 = () => {
    console.log("go to step 5")
    navigation.navigate("SignupStep5", {
      email,
      password,
      firstName,
      lastName,
      birthDate,
      role,
      departamento,
      provincia,
    });
  };

  const handleDepartamentoChange = (value) => {
    setDepartamento(value);
    setProvincia(null);
  };

  const getProvincias = () => {
    return departamento ? departments[departamento] : [];
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={[
            uiStyle.container,
            { gap: 15, flex: 1, justifyContent: "space-between" },
          ]}
        >
          <View style={{ gap: 15 }}>
            <Text style={[fontStyle.h2, fontStyle.light]}>
              Cuentanos un poco más sobre ti
            </Text>

            <Text style={[fontStyle.h3, fontStyle.light]}>Departamento</Text>

            <DropDownPicker
              open={openDepartment}
              value={departamento}
              items={Object.keys(departments).map((department) => ({
                label: department,
                value: department,
              }))}
              setOpen={setOpenDepartment}
              setValue={handleDepartamentoChange}
              style={uiStyle.input}
              containerStyle={{ marginBottom: 10, zIndex: 10 }}
              placeholder="Selecciona tu departamento"
              dropDownContainerStyle={{ zIndex: 20, position: "absolute" }}
            />

            {departamento && (
              <>
                <Text style={[fontStyle.h3, fontStyle.light]}>Provincia</Text>
                <DropDownPicker
                  open={openProvince}
                  value={provincia}
                  items={getProvincias().map((province) => ({
                    label: province,
                    value: province,
                  }))}
                  setOpen={setOpenProvince}
                  setValue={setProvincia}
                  style={uiStyle.input}
                  containerStyle={{ marginBottom: 10, zIndex: 10 }}
                  placeholder="Selecciona tu provincia"
                  disabled={!departamento}
                  dropDownContainerStyle={{ zIndex: 20, position: "absolute" }}
                />
              </>
            )}

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <GoBackButton onPress={() => navigation.goBack()} />
              <NextButton onPress={goToStep5} />
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignupStep4;
