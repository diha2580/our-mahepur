# Moheshpur Digital Portal

A comprehensive digital service portal for Moheshpur Upazila, built with React, Vite, Tailwind CSS, and Supabase.

## Features

- **Emergency Services**: Quick access to fire, police, and ambulance contacts.
- **Directory**: Contact information for district and upazila officials.
- **Health Services**: Information about government and private health facilities.
- **Tourist Spots**: Explore local attractions with images and descriptions.
- **E-Applications**: Direct links to various government online services.
- **Complaint Box**: Securely submit complaints to the administration.
- **Admin Panel**: Real-time management of portal data via Supabase.
- **Role-based Auth**: Secure login system with Admin and User roles.

## Deployment on Vercel

To deploy this project on Vercel, follow these steps:

1. **Push to GitHub**: Push your code to a GitHub repository.
2. **Import to Vercel**: Go to [vercel.com](https://vercel.com) and import your repository.
3. **Configure Environment Variables**:
   In the Vercel project settings, add the following environment variables:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL.
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anonymous API Key.
4. **Deploy**: Vercel will automatically detect the Vite configuration and deploy the app.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables in a `.env` file (refer to `.env.example`).
3. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React.
- **Backend**: Supabase (Auth, Database, Real-time).
- **State Management**: Custom Observer Pattern with Supabase sync.
