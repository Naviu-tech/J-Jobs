/**
 * CommonJS version of site configuration for use with Tailwind
 */
module.exports = {
  /**
   * Brand colors (hex values)
   */
  colors: {
    /** Primary brand color */
    main: "#077b8a", // Current blue-500
    /** Secondary brand color */
    secondary: "#5c3c92", // Current purple-500
  },
  
  /**
   * Path to the site logo (relative to public directory)
   */
  logo: "https://i.ibb.co/SwPK93yv/TTA-logo-black.png",
  
  /**
   * Social media links for the footer
   */
  socialLinks: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/jakesjobs/about/",
    },
    // Additional social links can be added here
  ],
  
  /**
   * Lead capture forms
   */
  forms: {
    /**
     * Form for job seekers
     * Use {{jobId}} as a placeholder to insert the current job ID
     * 
     * For Google Forms, use a URL like:
     * https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?usp=pp_url&entry.FIELD_ID={{jobId}}
     * 
     * Replace YOUR_FORM_ID with your Google Form ID and FIELD_ID with the ID of the field
     * that should receive the job ID
     */
    jobSeeker: "https://docs.google.com/forms/d/e/1FAIpQLSfxxxxxxxxxxxxxxxxxxxxxxx/viewform?usp=pp_url&entry.123456789={{jobId}}",
    
    /**
     * Form for employers looking to recruit
     */
    employer: "https://docs.google.com/forms/d/e/1FAIpQLSfyyyyyyyyyyyyyyyyyyy/viewform",
  },

  /**
   * Customizable text strings throughout the site
   * Edit these values to change text displayed on the site
   */
  text: {
    /**
     * Site-wide text
     * These are the primary values to change when rebranding the site
     */
    siteName: "Naviu's Jobs",
    siteTagline: "Discover your next job with Naviu",
    companyShortName: "Naviu", // Used in phrases like "job with Naviu"
    
    /**
     * Navigation text
     */
    nav: {
      about: "About",
      jobs: "Jobs"
    },
    
    /**
     * Home page text
     */
    home: {
      title: "Naviu Jobs",
      // The description will use siteName dynamically
      description: function(config) { 
        return `Discover your next career opportunity with ${config.text.siteName}. We connect job seekers with rewarding warehouse and light industrial positions across the United States.`;
      },
      headerTagline: "Find your next opportunity",
      // The header title will use siteName dynamically
      headerTitle: function(config) { 
        return config.text.siteName;
      },
      // The header description will use companyShortName dynamically
      headerDescription: function(config) { 
        return `Discover your next job with ${config.text.companyShortName}.`;
      }
    },
    
    /**
     * Headers
     */
    headers: {
      electricians: {
        // The tagline will use siteName dynamically
        tagline: function(config) { 
          return config.text.siteName;
        },
        title: "Find Qualified Electricians Faster",
        description: "Commercial, Residential, and Industrial Electricians. Fire Alarm, Controls, Security, Solar, Voice/Data, and Audio/Visual Jobs."
      }
    },
    
    /**
     * Buttons
     */
    buttons: {
      viewJobs: "View Jobs",
      aboutUs: "About Us",
      applyNow: "Apply for this position"
    },

    /**
     * SEO and accessibility text
     */
    seo: {
      // The logo alt text will use siteName dynamically
      logoAlt: function(config) { 
        return `${config.text.siteName} Logo`;
      },
      // The home title will use siteName dynamically
      homeTitle: function(config) { 
        return `${config.text.siteName} - Light Industrial Jobs`;
      },
      // The home description will use siteName dynamically
      homeDescription: function(config) { 
        return `Discover your next career opportunity with ${config.text.siteName}. We connect job seekers with rewarding positions across the United States.`;
      }
    }
  }
};
