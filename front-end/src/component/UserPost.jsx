import {
    Badge,
    Card,
    CardBody,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Link,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { URL_API } from '../helper'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";


export const UserPost = (props) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            let url = `${URL_API}/post/user/${props.user_id}`;

            const postsData = await axios.get(url);
            setPosts(postsData.data.data);
        }
        fetchPosts();
    }, []);

    // console.log(posts[0])
    // console.log(posts[0].photo)

    return (
        <div>
            <Center py={6}>
                <SimpleGrid columns={3} spacing={10}>
                    {posts.map((post) => {
                        return (
                            <Card
                                maxW="sm"
                                css={{
                                    border: "2px solid whitesmoke",
                                }}
                            >
                                <CardBody>
                                    <Image
                                        src={URL_API + '/' + post.photo}
                                        alt={post.caption}
                                        borderRadius="lg"
                                        objectFit={"cover"}
                                        onClick={() =>
                                            navigate(
                                                "../post/" + post.id
                                            )
                                        }
                                        h={"200px"}
                                        w={"250px"}
                                        css={{
                                            border: "2px solid whitesmoke",
                                        }}
                                    />
                                </CardBody>
                                {/* <CardFooter>
                                    <ButtonGroup spacing="2">
                                        <Button
                                            variant="solid"
                                            bg={"pink.400"}
                                            _hover={{
                                                bg: "pink.300",
                                            }}
                                            color="white"
                                            onClick={() =>
                                                navigate(
                                                    "/edit-product/" + product.id
                                                )
                                            }
                                        >
                                            Edit Product
                                        </Button>
                                    </ButtonGroup>
                                </CardFooter> */}
                            </Card>
                        );
                    })} 
                </SimpleGrid>
            </Center>          
        </div>
    );
}