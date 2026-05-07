import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type StyledButtonProps = TouchableOpacityProps & {
  text: string;
};

export function AppButton({
  text,
  ...props
}: StyledButtonProps) {
  return (
    <TouchableOpacity
      className={
        "px-4 py-2 rounded-md bg-primary items-center justify-center"
      }
      {...props}
    >
      <Text
        className={
          "text-text_secondary font-semibold text-base"
        }
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
