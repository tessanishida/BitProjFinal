# WorkSpace

WorkSpace was built to help young kids stay engaged while learning online. The web app uses a Pomodoro timer and guides kids through breaks and work time. Parents also have the option to fill out a contact form which is used to send them a report of their child’s activity at the end of each session using an Azure function and the Twilio API.

Visit WorkSpace: https://lively-bush-0e9bdb91e.azurestaticapps.net/

**About Me**

<img src="/Tessa.jpg" height="250px">

Hello! My name is Tessa Nishida, and I am a sophomore studying computer science at the University of Utah. I am originally from Honolulu, HI and I enjoy running, hiking, and traveling!

**About Workspace**

While helping to tutor young students during the pandemic, I noticed that kids had difficulties staying focused and motivated while learning online. Created WorkSpace to help kids develop good time management skills and help parents better idea of how their child learns. 

**How it Works**

Below is a diagram of the basic structure of the web app...

![diagram](/pres-diagram.jpg)

Here is a general outline of how to connect the frontend and backend..

1. Create a Azure Static Web App
2. Call Azure Function from frontend (Remember to use async functions!)
3. Call the Twilio API in the backend

Done!

**Thank you!**

This project was built as a part of the Bit Project Serverless BitCamp cohosted by Microsoft. I would like to thank my mentor Marie Hoeger for helping me throughout this process, as well as Emily, Evelyn, and Julia for leading our cohort.
