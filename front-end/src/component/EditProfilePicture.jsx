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
import { useNavigate} from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios";
import { URL_API } from '../helper'
import { HeaderComponent } from "./NavBar";

export const EditProfilePicture = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(0);
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

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("idToken", userId);

        console.log(file)

        axios.patch(`${URL_API}/user/profile-pic`, formData, {
        }).then(function(response){
            console.log(response.data);
        }).catch(function(err){
            console.log(err);
        });

        alert("Profile picture berhasil diperbarui");

        setTimeout(() => {
            navigate('../user');
        }, 500);

    }
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
                            Change Profile Picture
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
                                <FormControl id="file">
                                    <FormLabel>Image</FormLabel>
                                    <Input type="file" onChange={onFileChange} accept="image/*"/>
                                    {/* <input type="file" onChange={onFileChange} accept="image/*" /> */}
                                </FormControl>
                            </VStack>
                            <Stack spacing={10} pt={2}>
                                {file == 0 &&
                                    <Button loadingText="Submitting"
                                        size="lg"
                                        bg={"blue.400"}
                                        _hover={{
                                            bg: "blue.300",
                                        }}
                                        variant="solid"
                                        color="white"
                                        onClick={handleSubmit}
                                        isDisabled
                                    >
                                        Done
                                    </Button>
                                }
                                {file != 0 &&
                                    <Button loadingText="Submitting"
                                        size="lg"
                                        bg={"blue.400"}
                                        _hover={{
                                            bg: "blue.300",
                                        }}
                                        variant="solid"
                                        color="white"
                                        onClick={handleSubmit}
                                    >
                                        Done
                                    </Button>
                                }
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </div>
    );
};
