export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Unit Converter</h1>
      <div className="prose dark:prose-invert">
        <p>
          Unit Converter is a simple and efficient tool designed to help you convert between different units of measurement.
          Whether you're working with length, mass, volume, temperature, or time, our converter provides accurate results instantly.
        </p>
        
        <h2>Features</h2>
        <ul>
          <li>Support for multiple measurement categories</li>
          <li>Real-time conversions</li>
          <li>Clean and intuitive interface</li>
          <li>Dark mode support</li>
          <li>Mobile-friendly design</li>
        </ul>

        <h2>How It Works</h2>
        <p>
          Our converter uses precise conversion factors and formulas to ensure accurate results.
          The conversions are performed instantly on your device, and common conversions are cached
          to improve performance.
        </p>

        <h2>Contact</h2>
        <p>
          If you have any questions, suggestions, or feedback, please feel free to reach out to us.
          We're always looking to improve and add new features to make unit conversion easier for everyone.
        </p>
      </div>
    </div>
  )
} 