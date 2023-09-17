# READ ME

# ICE BREAKER
A game designed to help you break the ice with strangers and turn those awkward moments into memorable interactions

## [Link to play](https://v45-tier3-team-51-1sko.vercel.app/)

<kbd>
<img src="https://res.cloudinary.com/dsioshcio/image/upload/v1694896529/Screenshot_2023-09-16_at_13.32.16_osmwwy.png" width="700px" border="1px"/>
</kbd>
<kbd>
 <img src="https://res.cloudinary.com/dsioshcio/image/upload/v1694896530/Screenshot_2023-09-16_at_13.32.30_vitlow.png" width="700px" style="border: 1px solid black"/>
</kbd>


# Setup
- Run `npm install`
- Set up database
    - Rename `.env.example` to `.env`
    - Follow this guide to make a vercel postgres database: [guide](https://vercel.com/docs/storage/vercel-postgres/quickstart). Follow only until step 2 and copy the database URL.
    - Copy the secrets under the `.env.local` in the vercel postgres dashboard section after creating a database and paste the secrets in your `.env` file
    - Run `npx prisma migrate dev` to create the tables in your database
    - Run `npx prisma db seed` to populate the database with the initial set of questions
- Set up Pusher
    - Create a Pusher account and create a Channels app. 
    - From the Pusher Dashboard, navigate to App Keys. Copy your app_id, key, secret, and cluster.
    - In your `.env` file, paste your keys as follows:
        ```
            PUSHER_APP_ID = "your app_id"
            NEXT_PUBLIC_PUSHER_APP_KEY = "your key"
            PUSHER_APP_SECRET = "your secret"
        ```
    - In `pusher.ts`, update the cluster value to the value from your App Keys.


# Tech stack
- Next.js + React + Typescript
- Tailwind 
- Pusher Channels 
- Prisma + Vercel Postgres
- UI Library: Mantine
