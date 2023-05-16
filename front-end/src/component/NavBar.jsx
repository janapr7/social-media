import { Button, Flex, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const HeaderComponent = () => {
  const navigate = useNavigate();

  return (
    <VStack justify='space-evenly' align='flex-end' shadow="base" bgColor="gray.50" w="100vw" h="16">
      <Flex justify='space-evenly'>
        <Button mr='2' rounded={"full"} onClick={() => navigate("../")}>
          Home
        </Button>
        <Button mr='2' rounded={"full"} onClick={() => navigate("../create")}>
          Create Post
        </Button>
        <Button mr='2' rounded={"full"} onClick={() => navigate("../user")}>
          User Profile
        </Button>
      </Flex>
    </VStack>
  );
};
