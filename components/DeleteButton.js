import { View, Text, StyleSheet } from "react-native";

const DeleteButton = (props) => {
  return (
    <View style={styles.buttonWrap}>
      <View style={styles.buttonBG}>
        <Text>🗑</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrap: {
    backgroundColor: "#de4b31",
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBG: {
    width: 45,
    height: 45,
    backgroundColor: "#de4b31",
    opacity: 1,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DeleteButton;
