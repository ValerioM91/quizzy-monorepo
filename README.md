# Quizzy Monorepo (WIP)

This is a monorepo for Quizzy, a quiz app that allows admins to create quizzes and users take them. \
The idea is to have an API that can be used by multiple frontends, such as an admin panel where admin can manage the questions, a web app, a mobile app, and a desktop app. \

## How does it work?

The questions are either manually entered or generated using OpenAI's GPT-4 and stored in a PostGRES database. \
The API is built using Nest.js and Prisma and the frontends can be built using any framework of choice. \
The admin panel is built using Vite and React. \
