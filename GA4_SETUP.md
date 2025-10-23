# Google Analytics

### What's Being Tracked

1. **Page Views & Sessions** - Automatic tracking via nuxt-gtag
2. **Scroll Depth** - Tracks when users scroll 25%, 50%, 75%, and 100% of the page
3. **Service Inquiries** - Tracks which services users click "Inquire Now" on
4. **Contact Form Interactions** - Tracks:
   - Form opens (with preselected service if applicable)
   - Field focus events (name, email, company, message)
   - Service dropdown selections
   - Form submission success/failure
   - Form abandonment (closing without submission)

### Required Manual Step: Enable Google Signals for Demographics

To get demographic data (age, gender, location), you need to enable Google Signals in your GA4 property:

1. **Go to Google Analytics Admin Panel**

   - Visit [analytics.google.com](https://analytics.google.com)
   - Select your app

2. **Navigate to Data Collection Settings**

   - Click on "Data Collection and Modification" in the Property Settings column

3. **Enable Google Signals**

   - Toggle "Google signals data collection" to ON
   - Accept the terms of service
   - This enables demographics (age, gender) and interests data for signed in users

4. **Wait for Data**
   - Demographics data will appear in reports within 24-48 hours
   - Look for it in Reports → Demographics → Demographics details

### Custom Events Available

- `service_inquiry` - When users click "Inquire Now" on service cards
- `form_interaction` - When users interact with form fields
- `form_submission` - When forms are submitted (success/failure)
- `scroll_depth` - When users reach scroll milestones
- `modal_open` - When contact form opens
- `modal_close` - When contact form closes
