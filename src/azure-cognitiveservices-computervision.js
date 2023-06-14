// ./src/azure-cognitiveservices-computervision.js

// List of sample images to use in demo
import RandomImageUrl from './DefaultImages';

// Authentication requirements
const key = process.env.REACT_APP_AZURE_COMPUTER_VISION_KEY;
const endpoint = process.env.REACT_APP_AZURE_COMPUTER_VISION_ENDPOINT;

console.log(`key = ${key}`)
console.log(`endpoint = ${endpoint}`)

// Cognitive service features
const visualFeatures = [
    "tags",
    "read",
    "caption",
    "denseCaptions",
    "smartCrops",
    "objects",
    "people"
];

export const isConfigured = () => {
    const result = (key && endpoint && (key.length > 0) && (endpoint.length > 0)) ? true : false;
    console.log(`key = ${key}`)
    console.log(`endpoint = ${endpoint}`)
    console.log(`ComputerVision isConfigured = ${result}`)
    return result;
}

// Analyze Image from URL
export const computerVision = async (url) => {

    const requestUrl = `${endpoint}computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=${visualFeatures.join(',')}`
    console.log(`requestUrl = ${requestUrl}`)

    // get image URL - entered in form or random from Default Images
    const urlToAnalyze = url || RandomImageUrl();
    
    // analyze image
    const requestBody = {
        'url': urlToAnalyze
        }
    
    const headers = {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': key
    }

    try {
        const response = await fetch(requestUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody), 
            headers: headers,
            features: visualFeatures.join(',')
        });

        //Checking if error occured
        if (!response.ok) {
            throw new Error(`Computer Vision request failed: ${response.status} (${response.statusText})`);
        }

        const analysis = await response.json();

        // all information about image
        return { "URL": urlToAnalyze, ...analysis};
    } catch (error) {
        console.log(error);
    }
}