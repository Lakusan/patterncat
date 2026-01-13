import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Spinner } from '@/components/ui/spinner';
import Feather from '@expo/vector-icons/Feather';
import { Search } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

type SearchBarProps = {
  isDisabled: boolean;
  isInvalid: boolean;
  isReadOnly: boolean;
};


export default function SearchBarCustom(props: SearchBarProps) {

  const [isRecording, setIsRecording] = useState(false);

  const handleMicPress = () => {
    //simulate async work (e.g. start recording, API call)
    setIsRecording(true)
    setTimeout(() => {
      console.log("Mic pressed, recording:", !isRecording);
          setIsRecording(false); // toggle mic state
    }, 2000); // 2s spinner
  };

  return (
    <Input
      variant="outline"
      size="md"
      isDisabled={props.isDisabled}
      isInvalid={props.isInvalid}
      isReadOnly={props.isReadOnly}
      className="flex-row items-center border px-2 bg-white">
      <InputSlot className="pl-2">
        <InputIcon as={Search} size={"xl"} color={"gray"} />
      </InputSlot>
      <InputSlot className="flex-1">
        <InputField
          className="w-full"
          type="text"
          textAlign="left"
          placeholder={"Suche Schnittmuster"}
        />
      </InputSlot>
      <InputSlot className="w-6">
        <TouchableOpacity onPress={handleMicPress}>
          {isRecording ? (
            <Spinner size="small" color="grey"></Spinner>
          ) : (
            <Feather name="mic" size={18} color={"grey"} />
          )}
        </TouchableOpacity>
      </InputSlot>
    </Input>
  );
}