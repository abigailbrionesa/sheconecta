import RNPickerSelect from "react-native-picker-select";
import React from "react";

const PostTypePicker = ({ type, setType }) => {
  return (
    <RNPickerSelect
      onValueChange={setType}
      placeholder={{
        label: "(Experiencia, Beca, Curso, Proyecto)",
        value: "Experiencia",
      }}
      style={{
        inputIOS: {
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: 10,
        },
        inputAndroid: {
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: 10,
        },
        placeholder: {
          fontSize: 17,
          color: "gray",
        },
      }}
      value={type}
      items={[
        { label: "Experiencia", value: "experiencia" },
        { label: "Beca", value: "beca" },
        { label: "Curso", value: "curso" },
        { label: "Proyecto", value: "proyecto" },
      ]}
    />
  );
};

export default PostTypePicker;
