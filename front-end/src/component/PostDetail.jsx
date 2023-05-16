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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { HeaderComponent } from './NavBar';


export const PostDetail = () => {
    let postId = useParams().id
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
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
            let url = `${URL_API}/post/${postId}`;
            let url_comment = `${URL_API}/post/comment/${postId}`;

            const postsData = await axios.get(url);
            const commentsData = await axios.get(url_comment);
            setPosts(postsData.data.data);
            setComments(commentsData.data.data);
        }
        fetchPosts();
    }, []);

    console.log(posts.caption)
    console.log(comments[0])
    // console.log(posts[0].photo)
    const deletePost = async (post_id) => {
        try {
            const url = `${URL_API}/post/${post_id}`;
            let result = await axios.delete(url);

            alert("Post dihapus");

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
            <Center py={6}>
                <Stack
                    borderWidth="1px"
                    borderRadius="lg"
                    w={{ sm: '100%', md: '540px' }}
                    height={{ sm: '476px', md: '20rem' }}
                    direction={{ base: 'column', md: 'row' }}
                    bg={"gray.200"}
                    boxShadow={'2xl'}
                    padding={4}>
                    <Flex flex={1} bg="blue.200">
                        <Image
                            objectFit="cover"
                            boxSize="100%"
                            src={
                            URL_API + '/' + posts.photo
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
                            {posts.full_name}
                        </Heading>
                        <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                            {'@' + posts.username}
                        </Text>
                        <Text
                            textAlign={'center'}
                            color={'gray.500'}
                            px={3}>
                            {posts.caption}
                        </Text>
                        
                        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                            <Badge
                            px={2}
                            py={1}
                            color={'white'}
                            bg={'gray.800'}
                            fontWeight={'400'}>
                            {posts.like_count + ' likes'}
                            </Badge>
                        </Stack>

                        <Text
                            textAlign={'center'}
                            color={'gray.500'}
                            fontSize={'xs'}
                            px={3}>
                            {'Posted at ' + JSON.stringify(posts.day_posted) + ' (UTC)'}
                        </Text>

                        {/* <Text
                            textAlign={'center'}
                            color={'gray.500'}
                            fontSize={'xs'}
                            px={3}>
                            {'Date posted ' + posts.post_date.slice(0,10)}
                        </Text> */}

                        {posts.user_id == userId &&
                            <div>
                                <Button flex={1} fontSize={'sm'} rounded={'full'} _focus={{bg: 'gray.200',}}
                                onClick={() =>navigate("../edit-post/" + posts.id)}>
                                    Edit Caption
                                </Button>
                                <Button flex={1} fontSize={'sm'} rounded={'full'} _focus={{bg: 'gray.200',}}
                                onClick={() =>deletePost(posts.id)}>
                                    Hapus Post
                                </Button>
                            </div>
                        }
                    </Stack>
                </Stack>
            </Center>
            <Center>
                <Text><b>Comments</b></Text>
            </Center>
            {comments.map((comment)=>{
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
                                boxShadow={'2xl'}
                                padding={4}>
                                <Stack
                                    flex={1}
                                    flexDirection="column"
                                    p={1}
                                    pt={2}>
                                    <Text fontWeight={600} color={'gray.500'} size="sm" mb={4} align={'left'}>
                                        <b>{'@' + comment.username + ' '}</b>{comment.comment}
                                    </Text>
                                    <Text fontWeight={'thin'} color={'gray.500'} size="sm" mb={4} align={'left'} fontSize={'xs'}>
                                        {`(${comment.comment_date.slice(0, 10)} ${comment.comment_date.slice(11, 16)} UTC)`}
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