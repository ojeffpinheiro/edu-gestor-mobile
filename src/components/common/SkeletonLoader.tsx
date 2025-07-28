import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const SkeletonLoader: React.FC = () => {
    const { colors } = useTheme();
    const pulseAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );
        pulse.start();
        return () => pulse.stop();
    }, [pulseAnim]);

    const opacity = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 0.8],
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.skeletonItem,
                    {
                        backgroundColor: colors.background.secondary,
                        opacity,
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    skeletonItem: {
        height: 100,
        borderRadius: 8,
        marginBottom: 16,
    },
});

export default SkeletonLoader;