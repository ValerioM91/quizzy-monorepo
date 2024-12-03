# Quizzy Monorepo (WIP)

This is a monorepo for Quizzy, a quiz app that allows admins to create quizzes and users take them. \
The idea is to have an API that can be used by multiple frontends, such as an admin panel where admins can manage the questions, and a PWA (Progressive web app) where users can take the quizzes.

## How does it work?

The questions are either manually entered or generated using OpenAI's GPT-4 and stored in a PostgreSQL database. \
The API is built using Nest.js and Prisma and the frontends can be built using any framework of choice. \
The admin panel is built using Vite and React.

## Admin Dashboard Video Walkthrough

Since the admin dashboard is for admin only, here is a video walkthrough of the current state of the admin dashboard: \
https://www.youtube.com/watch?v=Kzux2Cji5p8
