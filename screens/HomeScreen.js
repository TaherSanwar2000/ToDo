// HomeScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { setupDatabase, getGroups, addGroup } from "../Database/database";

const HomeScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    setupDatabase();
    fetchGroups();
  }, []);

  const fetchGroups = () => {
    getGroups(setGroups);
    console.log("groups->", groups);
  };

  const handleAddGroup = () => {
    if (groupName.trim()) {
      const created_at = new Date().toISOString();
      console.log(created_at, groupName);
      addGroup(groupName, created_at, fetchGroups);
      setGroupName("");
    }
  };

  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: "#fff" }}>
      <StatusBar />
      <Text style={{ fontSize: 28, fontFamily: "DancingScript", color: "#ffc40c" }}>
        TO DO
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 12,
          borderColor: "#f0e68c",
          marginVertical: 12,
        }}
      >
        <TextInput
          style={{ fontSize: 14, color: "#000", fontFamily: "Platypi" }}
          placeholder="Creat your Collection"
          value={groupName}
          onChangeText={setGroupName}
        />
      </View>
      {groupName ? (
        <TouchableOpacity
          onPress={handleAddGroup}
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
            Create
          </Text>
        </TouchableOpacity>
      ) : null}

      <FlatList
        data={groups}
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
              navigation.navigate("TodoList", { groupId: item.id })
            }
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Platypi",
                color: "#000",
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{ fontSize: 12, fontFamily: "LibreBaskervilleRegular" }}
            >
              Created at: {new Date(item.created_at).toLocaleString()}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
