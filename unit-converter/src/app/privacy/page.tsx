import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Modern Unit Converter',
  description: 'Our privacy policy and data handling practices.',
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1>Privacy Policy</h1>
        
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>Information We Collect</h2>
        <p>
          We collect minimal information necessary to provide our unit conversion
          service. This includes:
        </p>
        <ul>
          <li>Conversion history (if you choose to save it)</li>
          <li>User preferences (e.g., dark mode setting)</li>
          <li>Basic usage analytics to improve our service</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>
          The information we collect is used solely to:
        </p>
        <ul>
          <li>Provide and improve our unit conversion service</li>
          <li>Remember your preferences</li>
          <li>Analyze and optimize performance</li>
        </ul>

        <h2>Data Storage</h2>
        <p>
          We use Redis for caching conversion results to improve performance.
          Cached data is automatically deleted after a short period and contains
          no personal information.
        </p>

        <h2>Cookies</h2>
        <p>
          We use essential cookies to remember your preferences and provide basic
          functionality. No third-party tracking cookies are used.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We do not share any personal information with third parties. Our service
          operates independently and does not rely on external services for core
          functionality.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul>
          <li>Access your data</li>
          <li>Delete your data</li>
          <li>Opt out of analytics</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about our privacy policy or data handling
          practices, please contact us.
        </p>
      </div>
    </main>
  );
} 