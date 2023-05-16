import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
} from '@chakra-ui/react';

import {
    Badge,
    Button,
    Flex,
    Link,
} from '@chakra-ui/react';

import { UserPost } from './UserPost';
import { URL_API } from '../helper'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { HeaderComponent } from './NavBar';
  
export const UserProfile = () => {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    // const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('idToken')))
    const [userId, setUserId] = useState(32)
    const [tokens, setToken] = useState(JSON.parse(localStorage.getItem('token')))


    if(tokens==null){
        navigate('../login');
    }

    useEffect(() => {
        async function fetchVerify() {
            try{
                let urlVerify = `${URL_API}/auth/verify-token`

                const data = {token: tokens}
                const result = await axios.post(urlVerify, data);
                
                if(result.data.data.isVerifiedToken==0){
                    navigate('../verification');
                }
                
                setUserId(result.data.data.idToken);

                let url = `${URL_API}/user/data/${userId}`;

                const profilesData = await axios.get(url);
                setProfiles(profilesData.data.data);

                
                console.log("Hasil baru:", result.data.data.idToken)
            }catch(err){
                console.log("Invalid token.")
                localStorage.clear()
                navigate('../login');
            }
        }
        fetchVerify()
    }, []);

    console.log(profiles)
    console.log("token:", JSON.parse(localStorage.getItem('token')));

    const logoutUser = async () => {
        localStorage.clear()
        navigate('../login');
    }
    return (
        <div>
            <HeaderComponent/>      
            <Center py={12}>
                <Box
                    role={'group'}
                    p={6}
                    maxW={'600px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}>
                    <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${URL_API + '/' + profiles.profile_pic})`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                        filter: 'blur(20px)',
                        },
                    }}>
                        <Center>
                            <Image
                                rounded={'3xl'}
                                height={200}
                                width={200}
                                objectFit={'cover'}
                                src={URL_API + '/' + profiles.profile_pic}
                            />
                        </Center>
                        <Text align={"center"}>
                            <Link
                                color={"blue.400"}
                                onClick={() => navigate('../change-profile-pic')}
                            >
                                Change Profile Picture
                            </Link>
                        </Text>
                        
                    </Box>
                    <Stack pt={10} align={'center'}>
                        <Text color={'gray.500'} fontSize={'sm'}>
                            <b>{`@${profiles.username} `}</b>{` (${profiles.email})`}
                        </Text>
                        <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
                            {profiles.full_name}
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text color={'gray.600'}>
                            {profiles.bio}
                            </Text>
                        </Stack>
                        <Stack mt={8} direction={'row'} spacing={4}>
                            <Button
                                flex={1}
                                fontSize={'sm'}
                                rounded={'full'}
                                onClick={() => navigate('../edit-profile')}
                                _focus={{
                                bg: 'gray.200',
                                }}>
                                Edit Profiles
                            </Button>
                            <Button
                                flex={1}
                                fontSize={'sm'}
                                rounded={'full'}
                                onClick={() => navigate('../change-username')}
                                _focus={{
                                bg: 'gray.200',
                                }}>
                                Change Username
                            </Button>
                            <Button
                                flex={1}
                                fontSize={'sm'}
                                rounded={'full'}
                                onClick={logoutUser}
                                _focus={{
                                bg: 'gray.200',
                                }}>
                                Logout
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Center>
            <UserPost user_id={userId}/>
        </div>
    );
}