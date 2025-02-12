import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Modern Unit Converter',
  description: 'Learn about our modern unit conversion tool and its features.',
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1>About Modern Unit Converter</h1>
        
        <p>
          Modern Unit Converter is a fast, accurate, and user-friendly tool designed
          to make unit conversions simple and intuitive. Whether you&apos;re a student,
          professional, or just need to convert units occasionally, our tool provides
          instant results with a beautiful, modern interface.
        </p>

        <h2>Features</h2>
        <ul>
          <li>Real-time conversions with instant results</li>
          <li>Support for multiple unit types (length, weight, temperature, etc.)</li>
          <li>Dark mode for comfortable viewing</li>
          <li>Mobile-friendly design</li>
          <li>Offline support with PWA capabilities</li>
          <li>AI-powered unit detection</li>
        </ul>

        <h2>Technology</h2>
        <p>
          Built with modern web technologies including Next.js, React, and TypeScript,
          our converter provides lightning-fast results while maintaining high accuracy.
          We use Redis caching to optimize performance and ensure quick response times.
        </p>

        <h2>Accuracy</h2>
        <p>
          All conversion factors are based on internationally recognized standards
          and are regularly updated to ensure accuracy. Our calculations are performed
          with high precision to minimize rounding errors.
        </p>

        <h2>Contact</h2>
        <p>
          Have suggestions or found an issue? Please feel free to contact us or
          contribute to the project on GitHub.
        </p>
      </div>
    </main>
  );
} 