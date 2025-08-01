import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AppButton from './AppButton';

const NavigationButtons = ({ onBack, onNext, colors }) => (
    <View style={styles.navigationButtons}>
        <AppButton
            title="Voltar"
            onPress={onBack}
            style={[styles.navButton, { backgroundColor: colors.feedback.error }]}
            icon={<Ionicons name="arrow-back" size={16} color="white" />}
        />

        <AppButton
            title="Próximo Aluno"
            onPress={onNext}
            style={[styles.navButton, { backgroundColor: colors.feedback.success }]}
            icon={<MaterialCommunityIcons name="account-arrow-right" size={16} color="white" />}
        />
    </View>
);


const styles = StyleSheet.create({
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    },
    navButton: {
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 10
    }
});

export default NavigationButtons;