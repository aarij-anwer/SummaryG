# Presentation Layout

[x] Share Screen

[x] Intros - 0.5 min

[x] What is Summary Guru? - 2.5 mins

[x] Tech Stack - 0.5 min

[x] Tech Features - 1 min

[x] Future Improvements - 0.5 min

## Share Screen

- Aarij shares screen
- Erkan and Andrew have their cameras on
- Aarij has a background screen behind him

## Intros - 0.5 min

- 30 secs
- Name, location, profession 
- Erkan
- Andrew
- Aarij

## What is Summary Guru - 2 min

- Aarij demos, Andrew talks
- Demo (Aarij)
  - An article - 
  - A movie - Top Gun
  - A book - 1984
- Highlight (Andrew):
  - Summary Guru is a Single Page App that uses OpenAI to intelligently summarize articles, movies and books
  - 4 API async calls
  - Page is rendered when all the API calls return successfully
  - Search and Results are inserted into the database
  - Page is rendered based on category: Article has takeaways in a numbered list, the Movie and Book is a review in a paragraph
- Highlight (Aarij):
  - Recent searches - pulls the last 10 from the database
  - Styling changes for each category
  - Error checking - detects an article, even if the category is "Movie" or "Book"
    - Aarij searches for an article as Andrew speaks
  - Recent seearches is session based
    - Aarij opens a new tab for the app, recent searches doesn't show anything
    - Previous tab shows recent searches
    - Add another search 
  - Responsive UI
    - Show the UI in mobile view (not the loading screen)
    - Nav bar changes to hamburger menu
    - Content resizing
    - Recent searches swipe up/down
    - Dark mode colours

## Tech Stack - 0.5 min

- Erkan speaks about the tech stack
- NextJS, Prisma, Tailwind for CSS
  - NextJS leverages React
  - Prisma connects to a SQLLite database
  - Tailwind for displaying responsive content
- We spent two planning days exploring various tech stacks. 
- We settled on our current stack as it gave us the best combination of learning new technologies while building a beautiful, functional application.

## Tech Features - 0.5 min

- Aarij talks about this
- Loading screen while waiting for the API calls to return
- Database to store searches and results, querying the DB using a custom built API
- Used async API calls to OpenAI (instead of using await) to speed up the app (doubling the speed of the app and improving the user experience)
- Used a variety of libraries and customized them to add features, such as:
  - uuid for sessions
  - HTML parser to beautifully display OpenAI responses
  - MaterialUI drawer component for recent searches, but styling it with Tailwind to have a uniform user experience

## Future Improvements - 0.5 min

- Displaying images for the content (e.g. movie poster, book cover, header image for an article)
- Ability for the user to specify length of review/summary
- Sharing the summary
- Login for users to store their searches (not just by sessions)