import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";


const DateTimePicker = () => {

    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [timePickerVisible, setTimePickerVisible] = useState(false);
    const [selectedDate,setSelectedDate]=useState('Selected Date:');
    const [selectedTime,setSelectedTime]=useState('Selected Time:');

    const showDatepicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleDateConfirm = date => {
        console.warn('A Date Has Been picked:', date);
        const dt=new Date(date);
        const x=dt.toISOString().split('T');
        const x1=x[0].split('-');
        console.log(x1[2]+"/"+x1[1]+"/"+x1[0]);
        setSelectedDate(x1[2]+"/"+x1[1]+"/"+x1[0]);
        hideDatePicker();
    };

    const showTimepicker = () => {
        setTimePickerVisible(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisible(false);
    }

    const handleTimeConfirm = time => {
        console.warn('A Time Has Been picked:', time);
        const dt=new Date(time);
        const x=dt.toLocaleTimeString();
        console.log(x);
        setSelectedTime(x);
        hideTimePicker();
    }

    return (
        <View style={styles.main}>
            <TouchableOpacity style={styles.button} onPress={() => {showDatepicker() }}>
                <Text style={{color:'blue',fontSize: 20 }}>{selectedDate}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {showTimepicker() }}>
                <Text style={{color:'blue',fontSize: 20 }}>{selectedTime}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={datePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />

            <DateTimePickerModal
                isVisible={timePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 200,
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor:'black',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10

    }
})

export default DateTimePicker;