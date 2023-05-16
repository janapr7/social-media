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

export const Register = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [emailState, setEmailState] = useState("");
    const [usernameState, setUsernameState] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const [repeatPasswordState, setRepeatPasswordState] = useState("");

    const handleClick = () => setShow(!show);

    const registerUser = async () => {
        try {
            const data = {
                email: document.getElementById("email").value,
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                repeatPassword: document.getElementById("repeatPassword").value,

            };

            const url = `${URL_API}/auth/register`;
            const result = await axios.post(url, data);

            document.getElementById("email").value = "";
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            document.getElementById("repeatPassword").value = "";

            alert("Register berhasil");

            setTimeout(() => {
                navigate('../');
            }, 500);
        } catch (err) {
            console.log(err);
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
                        User Registration
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
                            <FormControl id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="text" onChange={(e)=>setEmailState(e.target.value)}/>
                            </FormControl>
                            <FormControl id="username" isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input type="text" onChange={(e)=>setUsernameState(e.target.value)}/>
                            </FormControl>
                            {/* <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input type="text" />
                            </FormControl> */}
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
                            <FormControl id="repeatPassword" isRequired>
                                <FormLabel>
                                Repeat Password
                                </FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        pr="4.5rem"
                                        type={show ? 'text' : 'password'}
                                        placeholder="Re-enter password"
                                        onChange={(e)=>setRepeatPasswordState(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                        </VStack>
                        <Stack spacing={10} pt={2}>
                            {(emailState == "" || usernameState == "" || passwordState == "" || repeatPasswordState == "") &&
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
                                    Register
                                </Button>
                            }
                            {(emailState != "" && usernameState != "" && passwordState != "" && repeatPasswordState != "") &&
                                <Button loadingText="Submitting"
                                    size="lg"
                                    bg={"blue.400"}
                                    _hover={{
                                        bg: "blue.300",
                                    }}
                                    variant="solid"
                                    color="white"
                                    onClick={registerUser}
                                >
                                    Register
                                </Button>
                            }
                        </Stack>
                        <Stack mt={8} direction={'row'} spacing={4}>
                            <Button
                                flex={1}
                                fontSize={'sm'}
                                rounded={'full'}
                                color={"blue.300"}
                                onClick={() => navigate('../login')}
                                _focus={{
                                bg: 'gray.200',
                                }}>
                                Already have an account? Login
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};
