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
            {[...Array(4)].map((_, i) => (
                <Animated.View
                    key={i}
                    style={[
                        styles.card,
                        {
                            backgroundColor: colors.background.secondary,
                            opacity,
                        },
                    ]}
                />
            ))}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        padding: 16,
    },
    card: {
        width: '45%',
        height: 100,
        borderRadius: 8,
        opacity: 0.6,
    },
});

export default SkeletonLoader;