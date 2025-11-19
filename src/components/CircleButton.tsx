// components/AppButton.tsx
import React from 'react';
import { ActivityIndicator, Pressable, Text, TextStyle, ViewStyle } from 'react-native';

type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
};

const COLORS = {
  primary: '#2E7D32',
  primaryText: '#FFFFFF',
  secondary: '#EEEEEE',
  secondaryText: '#222222',
  outline: '#2E7D32',
  outlineText: '#2E7D32',
  disabledBg: '#CCCCCC',
  disabledText: '#777777',
};

const paddings: Record<Size, number> = { sm: 10, md: 14, lg: 18 };
const fontSizes: Record<Size, number> = { sm: 14, md: 16, lg: 18 };

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  iconLeft,
  iconRight,
  fullWidth = true,
}: Props) {
  const isDisabled = disabled || loading;

  const baseStyle: ViewStyle = {
    paddingVertical: paddings[size],
    paddingHorizontal: paddings[size] * 1.5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...(fullWidth ? { width: '100%' } : {}),
  };

  const variantStyle: ViewStyle =
    variant === 'primary'
      ? { backgroundColor: COLORS.primary }
      : variant === 'secondary'
      ? { backgroundColor: COLORS.secondary }
      : { backgroundColor: 'transparent', borderWidth: 1, borderColor: COLORS.outline };

  const disabledStyle: ViewStyle = isDisabled
    ? variant === 'outline'
      ? { borderColor: COLORS.disabledBg }
      : { backgroundColor: COLORS.disabledBg }
    : {};

  const textColor =
    isDisabled
      ? COLORS.disabledText
      : variant === 'primary'
      ? COLORS.primaryText
      : variant === 'secondary'
      ? COLORS.secondaryText
      : COLORS.outlineText;

  const labelStyle: TextStyle = {
    fontSize: fontSizes[size],
    fontWeight: '600',
    color: textColor,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        baseStyle,
        variantStyle,
        disabledStyle,
        pressed && !isDisabled && { opacity: 0.9, transform: [{ scale: 0.99 }] },
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {iconLeft}
          <Text style={[labelStyle, textStyle]}>{title}</Text>
          {iconRight}
        </>
      )}
    </Pressable>
  );
}
