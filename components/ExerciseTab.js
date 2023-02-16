import { StatusBar } from 'expo-status-bar';
import {
    Text, View, StyleSheet,
    SafeAreaView,
    Alert,
    Image
} from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

const white = '#fff';
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: white,
        flex: 1,
        justifyContent: 'center',
    },
    submitButton: {
        backgroundColor: '#0F5059',
        height: 50

    },
    largerTextBlue: {
        fontSize: 24,
        alignItems: 'center',
        fontWeight: 'bold',
        color: '#0F5059',
        margin: 20,
        padding: 20

    },
    largerTextWhite: {
        fontSize: 24,
        alignItems: 'center',
        fontWeight: 'bold',
        color: 'white',

    },
    input: {
        marginLeft: 70,
        marginRight: 70,
        marginTop: 20,
        marginBottom: 20

    },
});

export default function ExerciseTab() {
    return (
        <View style={styles.container}>
            <Icon
                name='run-circle'
                type='material-icons'
                color='#0F5059'
                size='200' />
            <Text
                style={styles.largerTextBlue}>
                Please enter your minutes of exercise below:
            </Text>
            <Input
                placeholder='Minutes of Exercise'
                inputContainerStyle={styles.input}

            />
            <Button
                buttonStyle={styles.submitButton}
                titleStyle={styles.largerTextWhite}
                title="Submit"
                onPress={() => Alert.alert('Your exercise has been recorded!')}
            />
            <StatusBar style="auto" />
        </View>
    );
}
