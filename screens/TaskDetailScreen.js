import React, { useEffect, useState } from "react";
import { View, Text, Button, Pressable, TouchableOpacity } from "react-native";
import {
  getTodoWithGroupById,
  updateTodo,
  deleteTodo,
} from "../Database/database";

const TaskDetailScreen = ({ route, navigation }) => {
  const { todoId, groupId, fetchTodo } = route.params;
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    getTodoWithGroupById(todoId, (todoItem) => {
      setTodo(todoItem);
    });
  };

  const handleUpdateTodo = () => {
    if (todo) {
      const updatedTodo = {
        ...todo,
        is_completed: true, // Example of marking as completed
      };
      updateTodo(
        todo.id,
        updatedTodo.title,
        updatedTodo.description,
        updatedTodo.is_completed,
        () => {
          fetchTodos();
          fetchTodo();
          navigation.goBack();
        }
      );
    }
  };

  const handleDeleteTodo = () => {
    deleteTodo(todoId, () => {
      fetchTodos();
      fetchTodo();
      navigation.goBack();
    });
  };

  return todo ? (
    <View style={{ flex: 1, padding: 16 }}>
      <Text
        style={{ fontSize: 28, fontFamily: "DancingScript", color: "#ffc40c" }}
      >
        Task Detail
      </Text>
      <TouchableOpacity
        style={{
          padding: 12,
          backgroundColor: "#fff",
          elevation: 6,
          borderRadius: 12,
          marginTop: "5%",
        }}
        onPress={() =>
          navigation.navigate("TaskCreation", { groupId, fetchTodos, todo })
        }
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "LibreBaskerville",
            color: "#808080",
          }}
        >
          Title: <Text style={{ color: "#000" }}>{todo.title}</Text>
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "LibreBaskerville",
            color: "#808080",
          }}
        >
          Description: <Text style={{ color: "#000" }}>{todo.description}</Text>
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "LibreBaskerville",
            color: "#808080",
          }}
        >
          Group: <Text style={{ color: "#000" }}> {todo.group_name}</Text>
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "LibreBaskerville",
            color: "#808080",
          }}
        >
          Status:{" "}
          <Text style={{ color: "#000" }}>
            {todo.is_completed === "true" ? "Completed" : "Pending"}
          </Text>
        </Text>
      </TouchableOpacity>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: "10%" }}
      >
        <TouchableOpacity
          onPress={handleUpdateTodo}
          style={{
            fle: 1,
            backgroundColor: "#f0e68c",
            padding: 12,
            borderRadius: 12,
            alignItems: "center",
            marginRight: 8,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "LibreBaskerville",
              color: "#000",
            }}
          >
            Mark as Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeleteTodo}
          style={{
            flex: 1,
            backgroundColor: "#ff6347",
            padding: 12,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "LibreBaskerville",
              color: "#fff",
            }}
          >
            Delete Task
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
};

export default TaskDetailScreen;
