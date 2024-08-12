// TaskCreationScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { addTodo, updateTodo } from "../Database/database";

const TaskCreationScreen = ({ route, navigation }) => {
  const { groupId, fetchTodos, todo } = route.params;
  console.log("todo in taskCreation ->", todo);
  const [title, setTitle] = useState(todo ? todo.title : "");
  const [description, setDescription] = useState(todo ? todo.description : "");

  const handleSave = () => {
    if (todo) {
      updateTodo(todo.id, title, description, todo.is_completed, fetchTodos);
    } else {
      addTodo(title, description, groupId, fetchTodos);
    }
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text
        style={{ fontSize: 28, fontFamily: "DancingScript", color: "#ffc40c" }}
      >
        {todo ? "Edit Task" : "New Task"}
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 12,
          borderColor: "#f0e68c",
          marginTop:24
        }}
      >
        <TextInput
          style={{ fontSize: 16, color: "#000", fontFamily: "Platypi" }}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View
        style={{
          height: 150,
          borderWidth: 1,
          borderRadius: 12,
          padding: 12,
          borderColor: "#f0e68c",
          marginVertical: 12,
        }}
      >
        <TextInput
          style={{
            fontSize: 14,
            color: "#000",
            fontFamily: "LibreBaskervilleRegular",
            flex: 1,
          }}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity
        onPress={handleSave}
        style={{
          backgroundColor: "#f0e68c",
          padding: 12,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "LibreBaskerville",
            color: "#000",
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskCreationScreen;
