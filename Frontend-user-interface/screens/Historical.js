import * as React from 'react';
import { Form, Button, View, Text, StyleSheet } from 'react-native';

import MapList from '../screens/MapList';

function Historical() {
    const handleSubmit = async (event) => {
        event.preventDefault()
        const formFields = event.target.elements;
        if (formFields.photo.files[0] !== undefined) {
            event.preventDefault()
            const file = formFields.photo.files[0]
            // get secure url from our server
            const {url} = await fetch("https://equimanagmentapi.vercel.app/api/horse/s3Url").then(res => res.json())
            // post the image direclty to the s3 bucket
            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: file
            })
            formData.photo = url.split('?')[0]
        }
        return (
            <View style={styles.container}>
                <MapList/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
  }
});

export default Historical;