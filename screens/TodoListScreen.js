// TodoListScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { getTodosByGroup, addTodo } from "../Database/database";

const TodoListScreen = ({ route, navigation }) => {
  const { groupId } = route.params;
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    getTodosByGroup(groupId, setTodos);
  };

  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: "#fff" }}>
      <Text
        style={{ fontSize: 28, fontFamily: "DancingScript", color: "#ffc40c" }}
      >
        TO DO List
      </Text>

      {todos.length > 0 ? (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#fff",
                borderRadius: 10,
                margin: 10,
                padding: 10,
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
              }}
              onPress={() =>
                navigation.navigate("TaskDetail", {
                  todoId: item.id,
                  fetchTodo: fetchTodos,
                  groupId,
                })
              }
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Platypi",
                  color: "#000",
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "LibreBaskervilleRegular",
                  color: item.is_completed === "true" ? "green" : "red",
                }}
              >
                {item.is_completed === "true" ? "Completed" : "Pending"}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={require("../assets/wrong-list.png")}
            style={{ height: 200, width: 200 }}
          />
          <Text style={{ fontSize: 18, color: "#000", fontFamily: "Platypi" }}>
            Your list is empty
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("TaskCreation", { groupId, fetchTodos })
        }
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
          Add TODO
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoListScreen;
