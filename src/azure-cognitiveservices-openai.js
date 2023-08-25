// Authentication requirements
const key = process.env.REACT_APP_AZURE_OPENAI_KEY;
const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
const api_type = process.env.REACT_APP_AZURE_OPENAI_API_TYPE ? process.env.REACT_APP_AZURE_OPENAI_API_TYPE : "azure";

console.log(`key = ${key}`)
console.log(`endpoint = ${endpoint}`)

export const isConfigured = () => {
    const result = (key && endpoint && (key.length > 0) && (endpoint.length > 0)) ? true : false;
    console.log(`OpenAI isConfigured = ${result}`)
    return result;
}

// Generate Image from text
export const imageGeneration = async (prompt) => {

    console.log(`api type = ${api_type}`)
    let requestUrl = "";
    let headers = {};
    if (api_type === "azure") {
        requestUrl = `${endpoint}openai/images/generations:submit?api-version=2023-06-01-preview`
        headers = {
            'Content-Type': 'application/json',
            'api-key': key,
        }
    }
    else {
        requestUrl = `${endpoint}images/generations`
        headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
        }
    }

    console.log(`requestUrl = ${requestUrl}`)
    
    // generate image
    const requestBody = {
        'prompt': prompt
        }

    try {
        let data = {};
        let response = await fetch(requestUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody), 
            headers: headers
        });
        
        if(api_type === "azure") {
        const operation_location = response.headers.get('operation-location')

        console.log(`operation_location = ${operation_location}`)

        let status = "";
        while (status !== "succeeded") {
            response = await fetch(operation_location, {
                method: 'GET',
                headers: headers
            });
            data = await response.json();
            status = data.status;
        }
        console.log(`status = ${status}`)
    }
    else{
        data = await response.json();
    }
        
        //Checking if error occured
        if (!response.ok) {
            throw new Error(`Image cannot be generated: ${response.status} (${response.statusText})`);
        }

        const imageUrl = api_type === 'azure' ? data.result.data : data.data;
        console.log(`imageUrl = ${imageUrl}`)
        
        return {"prompt": prompt, "URL": imageUrl[0].url};
    } catch (error) {
        console.log(error);
    }
}