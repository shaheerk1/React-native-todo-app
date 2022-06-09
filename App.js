import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import Task from "./components/Task";
import DeleteButton from "./components/DeleteButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [status, setStatus] = useState(false);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, { task, status }]);
    setTask(null);
    console.log(taskItems);
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@localTodos", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  // const taskTapped = (index) => {
  //   handleSingleTap(index);
  //   handleDoubleTap(index);
  // };

  let lastTap = null;

  const handleDoubleTap = (index) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      completeTask(index);
    } else {
      lastTap = now;
    }
  };

  const handleSingleTap = (index) => {
    if (!taskItems[index].status) {
      // 1. Make a shallow copy of the items
      taskItems[index].status = true;
      let taskItemsCopy = [...taskItems];
      setTaskItems(taskItemsCopy);
    } else {
      // 1. Make a shallow copy of the items
      taskItems[index].status = false;
      let taskItemsCopy = [...taskItems];
      setTaskItems(taskItemsCopy);
    }
  };
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  useEffect(() => {
    // setTaskItems(getData());
    getData()
      .then((data) => {
        console.log(data);
        setTaskItems(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    storeData(taskItems);
  }, [taskItems]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@localTodos");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  let keyUnique = 0;
  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Things todo</Text>
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {taskItems.map((item, index) => {
              keyUnique++;
              return (
                <View key={index} style={styles.eachTaskWrap}>
                  <TouchableOpacity onPress={() => handleSingleTap(index)}>
                    <Task text={item.task} todoState={item.status} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDoubleTap(index)}>
                    <DeleteButton />
                  </TouchableOpacity>
                </View>
              );
            })}
            <Task text={"Double tap the bin to delete"} todoState={true} />
          </View>
        </View>
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>➕</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3b3b3b",
  },
  items: {
    marginTop: 30,
  },
  eachTaskWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  writeTaskWrapper: {
    position: "relative",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 90,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
