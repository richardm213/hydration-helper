import { StatusBar } from 'expo-status-bar';
import {
    Text, View, StyleSheet,
    SafeAreaView,
    Alert,
    Image
} from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';

const white = '#fff';
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: white,
        flex: 1,
        justifyContent: 'center',
        bottom: 60
    },
    submitButton: {
        backgroundColor: '#0F5059',
        height: 50,
        borderRadius: 15,

    },
    largerTextBlueBold: {
        fontSize: 22,
        alignItems: 'center',
        fontWeight: 'bold',
        color: '#0F5059',
        margin: 20,
        padding: 20

    },
    largerTextBlue: {
        textAlign: 'center',
        fontSize: 22,
        alignItems: 'center',
        color: '#0F5059',
        margin: 20,

    },
    largerTextWhite: {
        fontSize: 22,
        alignItems: 'center',
        fontWeight: 'bold',
        color: 'white',
        padding: 20,

    },
    input: {
        marginLeft: 70,
        marginRight: 70,
        marginTop: 20,
        marginBottom: 20

    },
    moreDetails: {
        textAlign: 'center',
        width: 0.85 * ScreenWidth,
        color: '#0F5059'
    }
});

export default function ExerciseTab() {
    return (
        <View style={styles.container}>
            <Text style={styles.moreDetails}>
                Exercise is beneficial for your health, but it also increases your need for water.
            </Text>
            <Icon style={{ marginTop: 55 }}
                name='run-circle'
                type='material-icons'
                color='#0F5059'
                size='200' />
            <Text
                style={styles.largerTextBlueBold}>
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
