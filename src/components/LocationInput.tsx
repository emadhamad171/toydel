import React, { useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

navigator.geolocation = require('@react-native-community/geolocation');

const GOOGLE_PLACES_API_KEY = 'AIzaSyA1rodPwSRHxjRlxM6hc1R9fCeoL9202tA';

const GooglePlacesInput = ({placeholder, setLocation}) => {
    const ref= useRef(null);

    return (<GooglePlacesAutocomplete
            nearbyPlacesAPI='GoogleReverseGeocoding'
            ref={ref}
            placeholder={placeholder}
            onPress={(data, details = null) => {
                setLocation(data);
            }}
            onFail={(error) => console.error(error)}
            query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en',
            }}
            currentLocation={true}
            currentLocationLabel='Current location'
        />
    );
};

export default GooglePlacesInput;
