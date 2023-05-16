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

export const EditCaption = () => {
    let postId = useParams().id
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

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
            let url = `${URL_API}/post/${postId}`;

            const postsData = await axios.get(url);
            setPosts(postsData.data.data);
        }
        fetchPosts();
    }, []);

    const editCaption= async () => {
        try {
            const data = {
                caption: document.getElementById("newCaption").value,
            };

            const url = `${URL_API}/post/${postId}`;
            const result = await axios.patch(url, data);

            document.getElementById("newCaption").value = "";

            alert("Post berhasil diperbarui");

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
                            Edit Caption
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
                                <FormControl id="newCaption">
                                    <FormLabel>New Caption</FormLabel>
                                    <Input type="text" defaultValue={posts.caption}/>
                                </FormControl>
                            </VStack>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={"blue.400"}
                                    _hover={{
                                        bg: "blue.300",
                                    }}
                                    variant="solid"
                                    color="white"
                                    onClick={editCaption}
                                >
                                    Done
                                </Button>
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
