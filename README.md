# Setup
- Run `npm install`
- Rename `.env.example` to `.env`
- Follow this guide to make a vercel postgres database: [guide](https://vercel.com/docs/storage/vercel-postgres/quickstart). Follow only until step 2 and copy the database URL.
- Copy the secrets under the `.env.local` in the vercel postgres dashboard section after creating a database and paste the secrets in your `.env` file
- Run `npx prisma migrate dev` to create the tables in your database
- Run `npx prisma db seed` to populate the database with the initial set of questions

# Tech stack
- Next.js + React + Typescript
- Tailwind 
- Prisma + Vercel Postgres
- UI Library: Mantine

## Team Documents

You may find these helpful as you work together to organize your project.

- [Team Project Ideas](./docs/team_project_ideas.md)
- [Team Decision Log](./docs/team_decision_log.md)

Meeting Agenda templates (located in the `/docs` directory in this repo):

- Meeting - Voyage Kickoff --> ./docs/meeting-voyage_kickoff.docx
- Meeting - App Vision & Feature Planning --> ./docs/meeting-vision_and_feature_planning.docx
- Meeting - Sprint Retrospective, Review, and Planning --> ./docs/meeting-sprint_retrospective_review_and_planning.docx
- Meeting - Sprint Open Topic Session --> ./docs/meeting-sprint_open_topic_session.docx

[Keys to a well written README](https://tinyurl.com/yk3wubft).