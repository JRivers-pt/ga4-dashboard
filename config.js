/**
 * GA4 Analytics Dashboard Configuration
 * 
 * ⚠️ IMPORTANT: Update these values with your own credentials
 * 
 * To get your credentials:
 * 1. Go to Google Cloud Console: https://console.cloud.google.com/
 * 2. Create or select a project
 * 3. Enable the "Google Analytics Data API"
 * 4. Go to APIs & Services > Credentials
 * 5. Create OAuth 2.0 Client ID (Web application)
 * 6. Add http://localhost:5500 (or your URL) to Authorized JavaScript origins
 * 7. Copy your Client ID below
 * 
 * To find your GA4 Property ID:
 * 1. Go to Google Analytics: https://analytics.google.com/
 * 2. Admin (gear icon) > Property Settings
 * 3. Copy the Property ID (looks like: 123456789)
 */

const GA4_CONFIG = {
    // Your OAuth 2.0 Client ID from Google Cloud Console
    // Format: xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
    CLIENT_ID: '1053373877358-558iebem6f0a1qec2h5kiba0pj3mo0de.apps.googleusercontent.com',

    // Your GA4 Property ID (just the numbers, no "properties/" prefix)
    // Find it in GA4 Admin > Property Settings
    PROPERTY_ID: '489150612',

    // API Configuration (usually don't need to change these)
    SCOPES: 'https://www.googleapis.com/auth/analytics.readonly',
    DISCOVERY_DOC: 'https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta',
    API_ENDPOINT: 'https://analyticsdata.googleapis.com/v1beta',

    // Demo mode: Set to true to use sample data (useful for testing UI)
    DEMO_MODE: false,

    // Default date range (in days)
    DEFAULT_DATE_RANGE: 30
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GA4_CONFIG;
}
