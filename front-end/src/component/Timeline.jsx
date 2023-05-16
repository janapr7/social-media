import {
    Badge,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { URL_API } from '../helper'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { HeaderComponent} from './NavBar';


export const Timeline = () => {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);


    const [tokens, setToken] = useState(JSON.parse(localStorage.getItem('token')))
    // console.log("token:", tokens);
    if(tokens==null){
        navigate('../login');
    }

    useEffect(() => {
        async function fetchPosts() {
            let urlVerify = `${URL_API}/auth/verify-token`
            let url = `${URL_API}/post`;

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

            const postsData = await axios.get(url);
            setPosts(postsData.data.data);
        }
        fetchPosts();
    }, []);

    // console.log(posts[0])
    // console.log(posts[0].photo)

    return (
        <div>
            <HeaderComponent/>
            {posts.map((post)=>{
                return (
                    <div>
                        
                        <Center py={6}>
                            <Stack
                                borderWidth="1px"
                                borderRadius="lg"
                                w={{ sm: '100%', md: '540px' }}
                                height={{ sm: '476px', md: '20rem' }}
                                direction={{ base: 'column', md: 'row' }}
                                bg={"gray.200"}
                                onClick={() =>
                                    navigate(
                                        "/post/" + post.id
                                    )
                                }
                                boxShadow={'2xl'}
                                padding={4}>
                                <Flex flex={1} bg="blue.200">
                                    <Image
                                        objectFit="cover"
                                        boxSize="100%"
                                        src={
                                        URL_API + '/' + post.photo
                                        }
                                    />
                                </Flex>
                                <Stack
                                    flex={1}
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    p={1}
                                    pt={2}>
                                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                                        {post.full_name}
                                    </Heading>
                                    <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                                        {'@' + post.username}
                                    </Text>
                                    <Text
                                        textAlign={'center'}
                                        color={'gray.500'}
                                        px={3}>
                                        {post.caption}
                                    </Text>
                                    
                                    <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                                        <Badge
                                        px={2}
                                        py={1}
                                        color={'white'}
                                        bg={'gray.800'}
                                        fontWeight={'400'}>
                                        {post.like_count + ' likes'}
                                        </Badge>
                                    </Stack>

                                    <Text
                                        textAlign={'center'}
                                        color={'gray.500'}
                                        fontSize={'xs'}
                                        px={3}>
                                        {'Posted at ' + post.post_date.slice(11,16) + ' (UTC)'}
                                    </Text>

                                    <Text
                                        textAlign={'center'}
                                        color={'gray.500'}
                                        fontSize={'xs'}
                                        px={3}>
                                        {'Date posted ' + post.post_date.slice(0,10)}
                                    </Text>
                                </Stack>
                            </Stack>
                        </Center>
                    </div>
                )
            })}            
        </div>
    );
}