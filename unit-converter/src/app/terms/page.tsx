import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Modern Unit Converter',
  description: 'Terms and conditions for using our unit conversion service.',
};

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1>Terms of Service</h1>
        
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>Acceptance of Terms</h2>
        <p>
          By accessing and using Modern Unit Converter, you accept and agree to be
          bound by the terms and provision of this agreement.
        </p>

        <h2>Use License</h2>
        <p>
          Permission is granted to temporarily use this website for personal,
          non-commercial transitory viewing only. This is the grant of a license,
          not a transfer of title.
        </p>

        <h2>Disclaimer</h2>
        <p>
          The materials on Modern Unit Converter&apos;s website are provided on an
          &apos;as is&apos; basis. While we strive for accuracy, we make no warranties,
          expressed or implied, and hereby disclaim and negate all other warranties
          including, without limitation, implied warranties or conditions of
          merchantability, fitness for a particular purpose, or non-infringement
          of intellectual property or other violation of rights.
        </p>

        <h2>Limitations</h2>
        <p>
          In no event shall Modern Unit Converter or its suppliers be liable for
          any damages (including, without limitation, damages for loss of data or
          profit, or due to business interruption) arising out of the use or
          inability to use the materials on our website.
        </p>

        <h2>Accuracy of Materials</h2>
        <p>
          The materials appearing on our website could include technical,
          typographical, or photographic errors. We do not warrant that any of
          the materials on our website are accurate, complete, or current.
        </p>

        <h2>Links</h2>
        <p>
          Modern Unit Converter has not reviewed all of the sites linked to its
          website and is not responsible for the contents of any such linked site.
          The inclusion of any link does not imply endorsement by Modern Unit
          Converter of the site.
        </p>

        <h2>Modifications</h2>
        <p>
          Modern Unit Converter may revise these terms of service for its website
          at any time without notice. By using this website, you are agreeing to
          be bound by the then current version of these terms of service.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance
          with applicable laws and you irrevocably submit to the exclusive
          jurisdiction of the courts in that location.
        </p>
      </div>
    </main>
  );
} 