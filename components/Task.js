import { View, Text, StyleSheet } from "react-native";

const Task = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}>
          <Text>{props.todoState ? "✔" : " "}</Text>
        </View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    minWidth: 250,
    maxWidth: 250,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 1,
    borderRadius: 5,
    marginRight: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    maxWidth: "80%",
  },
});

export default Task;
