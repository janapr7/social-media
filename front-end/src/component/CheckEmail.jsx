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

export const CheckEmail = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [emailState, setEmailState] = useState("");
    const handleClick = () => setShow(!show);

    const checkEmail = async () => {
        try {
            const data = {
                email: document.getElementById("email").value,

            };

            const url = `${URL_API}/auth/register`;
            const result = await axios.post(url, data);

            document.getElementById("email").value = "";

            alert("Link reset password telah dikirim ke email");//get message

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
                        Insert Registered Email
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
                        </VStack>
                        <Stack spacing={10} pt={2}>
                            {(emailState == "") &&
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
                                    Send Email
                                </Button>
                            }
                            {(emailState != "") &&
                                <Button loadingText="Submitting"
                                    size="lg"
                                    bg={"blue.400"}
                                    _hover={{
                                        bg: "blue.300",
                                    }}
                                    variant="solid"
                                    onClick={checkEmail}
                                    color="white"
                                >
                                    Send Email
                                </Button>
                            }
                        </Stack>
                        <Stack mt={8} direction={'row'} spacing={4}>
                            <Button
                                flex={1}
                                fontSize={'sm'}
                                rounded={'full'}
                                color={"blue.300"}
                                onClick={() => navigate(-1)}
                                _focus={{
                                bg: 'gray.200',
                                }}>
                                Back
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};
