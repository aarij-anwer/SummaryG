SummaryAI is a Single Page App that uses OpenAI to intelligently summarize articles, movies and books. This app was the capstone project for the Lighthouse Labs Full Stack Web Developer program.

# Deployment

[SummaryAI](https://summaryai.vercel.app/)

# Features - MVP Version

- 4 async API calls to OpenAI
- Recent Searches feature stores a user's recent searches based on the session
- Responsive UI for mobile, desktop, dark and light mode
- Smart detection of user queries (e.g. user intends to search for a movie but the search type is set to articles, and vice versa)
- Loading screen to enhance user experience
- Deploy to Vercel

# Features - Developed After Graduation

- 4 async API calls to OpenAI, organized and optimized to ensure they execute within 10s so as to not timeout on Vercel
- Error handling for production
- Improve user experience by suggesting an article via API call to a newsfeed 
- Enhanced loading screen with more details during API calls
- Share search results with dynamic routing