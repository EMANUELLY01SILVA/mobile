import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import { Button, Pressable, StyleSheet, TextInput, View, KeyboardAvoidingView, Platform,Text } from "react-native";

// npm install expo-image (usar este código no terminal)

const foto = require("../assets/images/icon.png");

export default function Index() {
  const [image, setImage] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const [name, setName] = useState("Emanuelly Silva");
  const [email, setEmail] = useState("Emanuelly Silva@escola.pr.gov.br");
  const [phone, setPhone] = useState("(42) 9978-4376");
  const [address, setAddress] = useState("Ponta Grossa / PR");

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getPermission();
  }, []);

  const pickImage = async () => {
    if (!hasPermission) {
      alert('A permissão para acessar a galeria não foi concedida!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.containerImg}>
        <Pressable onPress={pickImage}>
          <Image
            source={image ? { uri: image } : foto}
            style={styles.estiloFoto}
          />
        </Pressable>
        <Button title="Trocar imagem" onPress={pickImage} />
      </View>
      <View style={styles.containerConteudo}>
        <View style={styles.containerNome}>
          <TextInput
            style={styles.nome}
            value={name}
            onChangeText={setName}
            placeholder="Emanuelly Silva"
            placeholderTextColor="gray"
          />
        </View>
        <Text style={styles.linha}>
          _______________________________________
        </Text>
        <View style={styles.containerDados}>
          <Ionicons name="person" size={24} color="white" />
          <TextInput
            style={styles.textoDados}
            value="17 anos"
            editable={false}
            placeholder="17 anos"
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.containerDados}>
          <Ionicons name="mail" size={24} color="white" />
          <TextInput
            style={styles.textoDados}
            value={email}
            onChangeText={setEmail}
            placeholder="Emanuelly Silva@escola.pr.gov.br"
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.containerDados}>
          <Ionicons name="call" size={24} color="white" />
          <TextInput
            style={styles.textoDados}
            value={phone}
            onChangeText={setPhone}
            placeholder="(42) 9978-4376"
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.containerDados}>
          <Ionicons name="home" size={24} color="white" />
          <TextInput
            style={styles.textoDados}
            value={address}
            onChangeText={setAddress}
            placeholder="Ponta Grossa / PR"
            placeholderTextColor="gray"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  containerImg: {
    flex: 1,
    paddingTop: 60,
  },
  estiloFoto: {
    width: 300,
    height: 300,
    borderRadius: 150, // Add border radius to make the image round
  },
  containerConteudo: {
    flex: 1,
    width: '80%',
  },
  containerNome: {
    alignItems: "center",
  },
  nome: {
    fontSize: 40,
    color: "red",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: "100%",
    marginBottom: 20,
  },
  linha: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
  },
  containerDados: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  textoDados: {
    marginLeft: 10,
    color: "white",
    fontSize: 24,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: "100%",
  },
});
