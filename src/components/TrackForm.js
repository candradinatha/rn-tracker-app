import React, { useContext } from 'react';
import { Context as LocationContext } from '../context/LocationContext';
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import userSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {

    const { state: {name, recording, locations}, startRecording, stopRecording, changeName } = useContext(LocationContext);
    const [saveTrack] = userSaveTrack();
    // console.log(locations.length);
    return (
        <>
            <Spacer>
                <Input 
                    value={name}
                    onChangeText={changeName}
                    placeholder="Enter track name"/>

                {recording 
                    ?   <Button
                            title="Stop Recording"
                            onPress={stopRecording}/>
                    :   <Button
                            title="Start Recording"
                            onPress={startRecording}/>
                }

                {
                    !recording && locations.length
                        ?   
                        <Button
                                style={{marginTop: 15}}
                                title="Save Recording"
                                onPress={saveTrack}/>
                        : null
                }
                
            </Spacer>
        </>
    )
}

export default TrackForm;