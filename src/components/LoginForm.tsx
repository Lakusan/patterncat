import { Button, ButtonText } from '@/components/ui/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { AlertCircleIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { router } from 'expo-router';
import React from 'react';
import { useTestContext } from '../hooks/use-test-context';

// Passwordreqirements as constants
// Input Validation
// User Feedback: Something went wrong



export default function LoginForm() {
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const { isAuthenticated, setIsAuthenticated } = useTestContext();


  const handleSubmit = () => {
    setIsAuthenticated(true)
    console.log(`LoginForm Button Authentication triggered; isAuthenticated: ${isAuthenticated}`)
    router.replace("/(main)/home")
  };

  return (
    <VStack>
      <FormControl
        isInvalid={isInvalid}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Password</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="md">
          <InputField
            type="password"
            placeholder="password"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
        </Input>
        <FormControlHelper>
          <FormControlHelperText>
            Must be at least 6 characters.
          </FormControlHelperText>
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
          <FormControlErrorText className="text-red-500">
            At least 6 characters are required.
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      <Button
        className="w-fit self-end mt-4 mr-2"
        size="sm"
        variant="outline"
        onPress={handleSubmit}
      >
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
  );
}
