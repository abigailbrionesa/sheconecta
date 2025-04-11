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


  const { email, password, firstName, lastName, age, role } =
    route.params;


  const goToStep5 = () => {
    console.log("go to step 5")
    navigation.navigate("SignupStep5", {
      email,
      password,
      firstName,
      lastName,
      age,
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
              setOpen={setOpenDepartment}
              value={departamento}
              setValue={handleDepartamentoChange}
              items={Object.keys(departments).map((department) => ({
                label: department,
                value: department,
              }))}
              style={uiStyle.input}
              placeholder="Selecciona tu departamento"
              zIndex={3000}
              zIndexInverse={1000}
            />


            {departamento && (
              <>
                <Text style={[fontStyle.h3, fontStyle.light]}>Provincia</Text>
                <DropDownPicker
                  open={openProvince}
                  value={provincia}
                  setOpen={setOpenProvince}
                  setValue={setProvincia}
                  items={getProvincias().map((province) => ({
                    label: province,
                    value: province,
                  }))}
                  style={uiStyle.input}
                  placeholder="Selecciona tu provincia"
                  disabled={!departamento}
                  zIndex={2000}
                  zIndexInverse={2000}
                />
              </>
            )}

</View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <GoBackButton onPress={() => navigation.goBack()} />
              <NextButton onPress={goToStep5} />
            </View>
         
        </View>
    </ImageBackground>
  );
};


export default SignupStep4;