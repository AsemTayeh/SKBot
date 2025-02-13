# **SKB-4 (Smart Komodo Bot-4)**  

SKB-4 is a GPT-powered Discord bot with **channel-specific context management** and **integrated weather reporting**. It handles conversations efficiently by maintaining a history of recent messages and reducing unnecessary API calls through smart token management.  


## **Features Overview**  

- **Per-Channel Message History**:  
  - Stores the last **20 messages per channel** using a global array.             
  - Automatically removes the oldest message when the history limit is reached.
    ![image](https://github.com/user-attachments/assets/c755156b-172c-453d-bde8-c9868e7425c6)

- **Weather API Integration**:  
  - Uses an external weather API to provide **live weather data** (temperature, time zone) when requested for a specific city.  
  - Implements error handling to provide fallback responses when the API fails.
    ![image](https://github.com/user-attachments/assets/f8bc71f2-8212-4439-bb80-65dac3c15f25)


- **GPT-Based Responses**:  
  - Integrates with **OpenAI’s GPT-4o-mini** model to generate replies based on message context.  
  - Sends the **latest message and relevant history** to maintain conversation flow.  

- **Channel Filtering**:  
  - Responds only in **authorized channels** listed via environment variables.  
  - Uses **channel ID filtering** to maintain separate conversation threads for different channels.  

- **Token Usage Optimization**:  
  - Requires **`@SKB-4` mention** to trigger responses, preventing unnecessary token consumption.  
  - Ignores messages from other bots.
    
    ![image](https://github.com/user-attachments/assets/ad80b401-5eb3-4f74-a616-8f54d6566f20)


## How to install:
1. Install Node on your computer (Version 20.18.0) on: https://nodejs.org/en/download/package-manager
2. Clone the repositry.
3. Create a discord App using discordDev and get your discord API key on: https://discord.com/developers/applications
4. Log into platform.openai to get your openAI API key on: https://platform.openai.com
5. Log into meteoweather to get your meteoweather API key on: https://open-meteo.com
6. ```npm install``` install all dependencies.
7. ```cp .env.example .env``` copy the enviroment example to a valid .env file.
8. Fill the API keys in your new .env file.
9. ```node index.js``` to run the bot.
