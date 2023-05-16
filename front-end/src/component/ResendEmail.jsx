import { Box, Heading, Text, Stack, Button } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function ResendEmail() {
    const [tokens, setToken] = useState(JSON.parse(localStorage.getItem('token')))
    if(tokens==null){
        navigate('../login');
    }

    const navigate = useNavigate();
    return (
        <Box textAlign="center" py={10} px={6}>
            <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
            <Heading as="h2" size="xl" mt={6} mb={2}>
                Silahkan Verifikasi Akun Anda
            </Heading>
            <Text color={'gray.500'}>
                Cek email verifikasi pada inbox.
            </Text>
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
                    Resend Email Verification
                </Button>
            </Stack>
        </Box>
    );
}