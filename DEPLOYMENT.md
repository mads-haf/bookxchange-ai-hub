
# BookXchange Deployment Guide

## Prerequisites

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Install Firebase CLI: `npm install -g firebase-tools`
3. Obtain your Firebase project credentials from Project Settings

## Setup Environment Variables

Create a `.env.local` file in the project root with your Firebase credentials:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Configure Firebase

1. Update `.firebaserc` with your Firebase project ID:
   ```json
   {
     "projects": {
       "default": "your-firebase-project-id"
     }
   }
   ```

## Firebase Setup

1. Enable Authentication in Firebase Console:
   - Go to Authentication > Sign-in method
   - Enable Email/Password authentication

2. Create Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
   - Choose a location close to your users

3. Enable Storage:
   - Go to Storage
   - Set up Cloud Storage

## Build and Deploy

1. Build the project:
   ```
   npm run build
   ```

2. Login to Firebase:
   ```
   firebase login
   ```

3. Deploy to Firebase:
   ```
   firebase deploy
   ```

4. Access your deployed application at:
   https://your-project-id.web.app

## Monitoring

Monitor your application using Firebase Console:
- Authentication: User management
- Firestore: Database usage
- Storage: File storage usage
- Hosting: Deployment history
- Analytics: User behavior

