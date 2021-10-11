## Setup

> Note these instructions are for running the sample on your local machine, the tunnelling solution is required because
the Teams service needs to call into the bot.
1) Clone the repository

2) Install modules

3) Update the `.env` configuration for the bot to use the Microsoft App Id and App Password from the Bot Framework registration

4) Run ngrok - point to port 3978

    ```bash
    ngrok http -host-header=rewrite 3978
    ```

5) Run your bot at the command line:

    ```bash
    npm start
    ```

6) Zip all the files in teamsAppManifest and sideload to Teams. 

7) Run 'Create Reaction' message action