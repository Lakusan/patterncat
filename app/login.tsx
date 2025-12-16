import InputControlled from '@/src/components/Auth';
import { Text } from 'react-native';

export default function Login() {
  return (
    <>

    <Text>Login</Text>
        {/* <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent className="max-w-[375px]">
        <ModalBody>
          <Text className="text-center">
            Log In or Create a user account to feel the magic of PATTERN CAT 
          </Text>
          <Text className="text-center">  </Text>
          <VStack space="lg" className="w-full">
            <Button className="flex-1 bg-purple-500">
              <ButtonText>Log In</ButtonText>
            </Button>
            <Button className="flex-1 bg-purple-500">
              <ButtonText>Register</ButtonText>
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter>
        <Image
          source={require("@/assets/images/icon.png")}
          alt="image"
          className="h-[185px] w-full rounded"
        />
        </ModalFooter>
      </ModalContent>
    </Modal> */}
    <InputControlled></InputControlled>
    </>
  );
}