import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Select,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios";
import { URL_API } from '../helper'
import { HeaderComponent } from "./NavBar";

export const EditUsername = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [usernameState, setUsernameState] = useState("");
    const [userId, setUserId] = useState(0);

    const [tokens, setToken] = useState(JSON.parse(localStorage.getItem('token')))
    if(tokens==null){
        navigate('../login');
    }

    useEffect(() => {
        async function fetchVerify() {
            let urlVerify = `${URL_API}/auth/verify-token`

            const data = {token: tokens}

            try{
                const result = await axios.post(urlVerify, data);
                // console.log("Hasil:", result.data.data)
                if(result.data.data.isVerifiedToken==0){
                    navigate('../verification');
                }

                setUserId(result.data.data.idToken);
            }catch(err){
                console.log("Invalid token.")
                localStorage.clear()
                navigate('../login');
            }
        }
        fetchVerify();
    }, []);

    useEffect(() => {
        async function fetchPosts() {
            let url = `${URL_API}/user/${userId}`;

            const usersData = await axios.get(url);
            setUsers(usersData.data.data);
        }
        fetchPosts();
    }, []);

    const editUsername= async () => {
        try {
            const data = {
                username: document.getElementById("username").value,
            };

            const url = `${URL_API}/user/username/${userId}`;
            const result = await axios.patch(url, data);

            document.getElementById("username").value = "";

            alert("Username berhasil diperbarui");

            setTimeout(() => {
                navigate(-1);
            }, 500);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <HeaderComponent/>
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} w={500}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"} textAlign={"center"}>
                            Change Username
                        </Heading>
                    </Stack>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <Stack spacing={4}>
                            <VStack>
                                <FormControl id="username" isRequired>
                                    <FormLabel>New Username</FormLabel>
                                    <Input type="text" onChange={(e)=>setUsernameState(e.target.value)} defaultValue={users.username}/>
                                </FormControl>
                            </VStack>
                            <Stack spacing={10} pt={2}>
                                {(usernameState == "") &&
                                    <Button loadingText="Submitting"
                                        size="lg"
                                        bg={"blue.400"}
                                        _hover={{
                                            bg: "blue.300",
                                        }}
                                        variant="solid"
                                        color="white"
                                        isDisabled
                                    >
                                        Done
                                    </Button>
                                }
                                {(usernameState != "") &&
                                    <Button loadingText="Submitting"
                                        size="lg"
                                        bg={"blue.400"}
                                        _hover={{
                                            bg: "blue.300",
                                        }}
                                        variant="solid"
                                        onClick={editUsername}
                                        color="white"
                                    >
                                        Done
                                    </Button>
                                }
                            </Stack>
                            <Stack pt={6}>
                                <Text align={"center"}>
                                    <Link
                                        color={"blue.400"}
                                        onClick={() => navigate(-1)}
                                    >
                                        Back
                                    </Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </div>
    );
};
