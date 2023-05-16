import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
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
import { useState } from "react"
import axios from "axios";
import { URL_API } from '../helper'

export const Login = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [credentialState, setCredentialState] = useState("");
    const [passwordState, setPasswordState] = useState("");

    const handleClick = () => setShow(!show);
    // const handleChangeEmail = () => setCredentialState(1);

    const loginUser = async () => {
        try {
            const data = {
                credential: document.getElementById("credential").value,
                password: document.getElementById("password").value,

            };

            const url = `${URL_API}/auth/login`;
            const result = await axios.post(url, data);

            document.getElementById("credential").value = "";
            document.getElementById("password").value = "";

            alert(result.data.message)
            localStorage.setItem('token', JSON.stringify(result.data.data.token))

            setTimeout(() => {
                navigate('../');
            }, 500);
        } catch (err) {
            console.log(err);
            alert(err)
        }
    };
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} w={500}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Login
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
                            <FormControl id="credential" isRequired>
                                <FormLabel>Email or Username</FormLabel>
                                <Input type="text" onChange={(e)=>setCredentialState(e.target.value)}/>
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>
                                Password
                                </FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        pr="4.5rem"
                                        type={show ? 'text' : 'password'}
                                        placeholder="Enter password"
                                        onChange={(e)=>setPasswordState(e.target.value)}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                        </VStack>
                        <Stack spacing={10} pt={2}>
                            {(credentialState == "" || passwordState == "") &&
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
                                    Login
                                </Button>
                            }
                            {(credentialState != "" && passwordState != "") &&
                                <Button loadingText="Submitting"
                                    size="lg"
                                    bg={"blue.400"}
                                    _hover={{
                                        bg: "blue.300",
                                    }}
                                    variant="solid"
                                    onClick={loginUser}
                                    color="white"
                                >
                                    Login
                                </Button>
                            }
                        </Stack>
                        <Stack mt={8} direction={'row'} spacing={4}>
                            <Button
                                flex={1}
                                fontSize={'sm'}
                                rounded={'full'}
                                color={"blue.300"}
                                onClick={() => navigate('../register')}
                                _focus={{
                                bg: 'gray.200',
                                }}>
                                Create Account
                            </Button>
                            <Button
                                flex={1}
                                fontSize={'sm'}
                                rounded={'full'}
                                color={"blue.300"}
                                onClick={() => navigate('../check-email')}
                                _focus={{
                                bg: 'gray.200',
                                }}>
                                Forgot Password
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};
