import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import Sound from "react-native-sound";

const PlayAudio = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);

    useEffect(() => {
        Sound.setCategory('Playback');
        return () => {
            if (sound) {
                sound.stop();
                sound.release();
            }
        }
    }, [sound]);

    const PlaySound = () => {
        const soundObject = new Sound('https://file-examples.com/storage/fe34a88a9a65cf545955ccb/2017/11/file_example_MP3_1MG.mp3', Sound.MAIN_BUNDLE,
            error => {
                if (error) {
                    console.log("failed", error);
                    return;
                }
                setSound(soundObject);
                soundObject.play(() => {
                    soundObject.release();
                    setIsPlaying(false);
                });
                setIsPlaying(true);
            },);
    };

    const stopSound = () => {
        if (sound) {
            sound.stop(() => {
                setIsPlaying(false);
            });
        };
    };
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around'
        }}>
            <Button title="Start Audio" onPress={PlaySound} disabled={isPlaying} />
            <Button title="Stop Audio" onPress={stopSound} disabled={!isPlaying} />
        </View>
    );
};

export default PlayAudio;