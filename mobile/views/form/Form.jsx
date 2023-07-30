import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput, Button } from "react-native-paper";
const Form = () => {
  return (
    <View style={styles.form}>
      <TextInput
        label={"Task title"}
        mode="outlined"
        placeholder="Give Title"
        style={styles.input}
      />
      <TextInput
        label={"Describe"}
        mode="outlined"
        placeholder="Describe the task"
        style={styles.input}
      />
      <TextInput
        label={"Due Date"}
        mode="outlined"
        placeholder="MM-DD-YYYY"
        style={styles.input}
      />
      <TextInput
        label={"Due Time"}
        mode="outlined"
        placeholder="HH-MM"
        style={styles.input}
      />
      <TextInput
        label={"Due Date"}
        mode="outlined"
        placeholder="MM-DD-YYYY"
        style={styles.input}
      />
      <Button icon="plus" mode="contained" style={styles.btn}>
        Save task
      </Button>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  form: { width: "96%", alignSelf: "center" },
  input: { marginTop: 15 },
  btn: { marginTop: 15, backgroundColor: "#800080" },
});
