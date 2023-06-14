// Authentication requirements
const key = process.env.REACT_APP_AZURE_OPENAI_KEY;
const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;

console.log(`key = ${key}`)
console.log(`endpoint = ${endpoint}`)

export const isConfigured = () => {
    const result = (key && endpoint && (key.length > 0) && (endpoint.length > 0)) ? true : false;
    console.log(`key = ${key}`)
    console.log(`endpoint = ${endpoint}`)
    console.log(`OpenAI isConfigured = ${result}`)
    return result;
}

// Generate Image from text
export const imageGeneration = async (prompt) => {

    // Uncomment this line to use an Azure OpenAI endpoint
    //const requestUrl = `${endpoint}openai/images/generations:submit?api-version=2023-06-01-preview`
    
    //Uncomment this line to use OpenAI API
    const requestUrl = `${endpoint}images/generations`

    console.log(`requestUrl = ${requestUrl}`)
    
    // analyze image
    const requestBody = {
        'prompt': prompt
        }
    
    const headers = {
        'Content-Type': 'application/json',
        // Uncomment this line to use your Azure OpenAI endpoint
        //'api-key': key,

        // Uncomment this line to use OpenAI API
        'Authorization': `Bearer ${key}`
    }

    try {
        const response = await fetch(requestUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody), 
            headers: headers
        });

        //Checking if error occured
        if (!response.ok) {
            throw new Error(`Image cannot be generated: ${response.status} (${response.statusText})`);
        }

        const data = await response.json();
        const imageUrl = data.data;
        console.log(`imageUrl = ${imageUrl}`)
        
        return {"prompt": prompt, "URL": imageUrl[0].url};
    } catch (error) {
        console.log(error);
    }
}