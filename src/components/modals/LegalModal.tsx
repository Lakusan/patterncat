import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { ReactNode } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View } from "react-native";

type LegalModalProps = {
    visible: boolean;
    title: string;
    hasRead: boolean;
    onClose: () => void;
    onReadComplete: () => void;
    children: ReactNode;
};

export function LegalModal({
    visible,
    title,
    hasRead,
    onClose,
    onReadComplete,
    children,
}: LegalModalProps) {
    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;

        const isBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 40;

        if (isBottom) {
            onReadComplete();
        }
    };

    return (
        <Modal isOpen={visible} onClose={onClose}>
            <ModalBackdrop />

            <ModalContent className="bg-white rounded-2xl p-4 w-[90%] self-center">

                <ModalHeader>
                    <Heading className="text-xl font-bold">{title}</Heading>
                </ModalHeader>

                <ModalBody>
                    <View className="max-h-[400px]">
                        <ScrollView
                            contentContainerStyle={{ paddingBottom: 40 }}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                        >
                            {children}
                        </ScrollView>
                    </View>

                    {/* Feedback unter dem Scrollbereich */}
                    <View className="h-6 mt-2">
                        {hasRead && (
                            <Text className="text-green-600 text-center font-medium">
                                ✓ vollständig gelesen
                            </Text>
                        )}
                    </View>
                </ModalBody>

                <ModalFooter className="flex-col gap-3">

                    {/* Weiter-Button */}
                    <Button
                        isDisabled={!hasRead}
                        className={`
                        w-full py-3 rounded-xl
                        transition-all duration-300
                        ${hasRead ? "bg-blue-600 opacity-100" : "bg-gray-300 opacity-60"}
                        `}
                        onPress={onClose}
                    >
                        <ButtonText className="text-white font-semibold">
                            Weiter
                        </ButtonText>
                    </Button>

                    {/* Schließen-Button */}
                    <Button
                        variant="outline"
                        onPress={onClose}
                        className="w-full border-gray-300"
                    >
                        <ButtonText className="text-gray-700">Schließen</ButtonText>
                    </Button>

                </ModalFooter>

            </ModalContent>
        </Modal>
    );
}
