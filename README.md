# Analyze and generate images with Cognitive Services
This repository contains the demo material for the Microsoft Reactor session *"The CEMA AI Show - Cognitive Services"*.

### Empower your app with Computer Vision
Do you know how AI can see the world around us? Do you know how AI can generate a picture of a seaside landscape in a photorealistic style? In this session, we are going to demystify computer vision and image generation to show you how you can embed them into your applications using Azure services.


* Speakers: [Carlotta Castelluccio](https://www.linkedin.com/in/carlotta-castelluccio/), Cloud Advocate at Microsoft &
            [Hadeel Shubair](https://www.linkedin.com/in/hadeel-shubair-9883a9160/), Cloud Advocate at Microsoft
* Event page: [The AI show! Session #5 - Cognitive Services](https://developer.microsoft.com/en-us/reactor/events/19883/?WT.mc_id=academic-99204-cacaste) 

## Demo
### Pre-requisites

#### To run the app locally
To set up your local environment and run the web app you need to configure the following pre-requisites:
* [Azure subscription](https://azure.microsoft.com/en-us/pricing/offers/ms-azr-0044p/) or an [Azure for students free trial](https://azure.microsoft.com/en-us/students/?WT.mc_id=academic-99204-cacaste).
  * [Computer vision resource](https://ms.portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision).
  * [Azure OpenAI resource](https://ms.portal.azure.com/#create/Microsoft.CognitiveServicesOpenAI). Access to this service (and in particular to DALLE model) should be requested in advance through [this form](https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR7en2Ais5pxKtso_Pz4b1_xUOFA5Qk1UWDRBMjg0WFhPMkIzTzhKQ1dWNyQlQCN0PWcu). If your application don't match the [acceptance criteria](https://learn.microsoft.com/legal/cognitive-services/openai/limited-access?context=%2Fazure%2Fcognitive-services%2Fopenai%2Fcontext%2Fcontext?WT.mc_id=academic-99204-cacaste), you can use [OpenAI public APIs](https://platform.openai.com/docs/api-reference/introduction).
* [Node.js and npm](https://nodejs.org/en/download) - installed to your local machine.
* [Visual Studio Code](https://code.visualstudio.com/) - installed to your local machine.
* [Build and deploy a Static Web App to Azure](https://learn.microsoft.com/en-us/azure/developer/javascript/tutorial/static-web-app-image-analysis?tabs=bash%2Cvscode&WT.mc_id=academic-99204-cacaste)

#### To deploy the app on the Cloud
In addition to the pre-requisites above, if you wish to deploy and run your app on Azure you'll need to have the following:
* [Azure static Web App resource](https://ms.portal.azure.com/#create/Microsoft.StaticApp)
* [Azure Static Web Apps VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps) - used to deploy React app to Azure Static Web app.
* [GitHub account](https://github.com/) - to fork and push to a repo, which activates [GitHub actions](https://docs.github.com/actions)

### Description
The goal of this demo is to showcase how to empower your app with Computer Vision capabilities. 

#### App functionalities
The React app of this demo provides the following functionalities:

* Display message if Azure key and endpoint for Cognitive Services Computer Vision or Azure OpenAI service isn't found
* Allows you to analyze an image with Cognitive Services Computer Vision, by entering a public image URL or analyzing an image from collection.
  * When analysis is complete: it displays the analyzed image and Computer Vision JSON results.
* Allows you to generate an image with [DALLE](https://openai.com/dall-e-2), by entering a textual prompt. 
  * When generation process is complete: it displays the generated image and the correspoing url.

#### Step-by-step guide


### Useful Resources
* [Create Computer Vision solutions with Azure Cognitive Services](https://learn.microsoft.com/en-us/training/paths/create-computer-vision-solutions-azure-cognitive-services/?WT.mc_id=academic-99204-cacaste)
* [What is Image Analysis?](https://learn.microsoft.com/en-us/azure/cognitive-services/computer-vision/overview-image-analysis?tabs=4-0&WT.mc_id=academic-99204-cacaste)
* [Generating an image using Azure OpenAI service](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/dall-e-quickstart?pivots=rest-api&WT.mc_id=academic-99204-cacaste)
* [Build and deploy a Static Web app to Azure](https://learn.microsoft.com/en-us/azure/developer/javascript/tutorial/static-web-app-image-analysis?tabs=bash%2Cvscode&WT.mc_id=academic-99204-cacaste)

