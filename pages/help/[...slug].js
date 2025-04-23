import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Help() {
  const { query } = useRouter();
  const slug = query.slug || [];
  const section = slug[0] || 'index';

  const helpContent = {
    index: {
      title: 'Help Center',
      content: (
        <div>
          <p className="mb-4">Welcome to the Movie House Help Center! Please select a section:</p>
          <ul className="space-y-2">
            <li><Link href="/help/faqs" className="text-blue-600 hover:underline">FAQs</Link></li>
            <li><Link href="/help/contact" className="text-blue-600 hover:underline">Contact Us</Link></li>
            <li><Link href="/help/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>
      )
    },
    faqs: {
      title: 'Frequently Asked Questions',
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-bold">How do I filter movies by genre?</h3>
            <p>Visit the Genres page and select a genre to see all related movies.</p>
          </div>
          <div>
            <h3 className="font-bold">Can I search for specific movies?</h3>
            <p>Yes, use the search bar at the top of the Movies page.</p>
          </div>
          <div>
            <h3 className="font-bold">How often is new content added?</h3>
            <p>Our database is updated weekly with new releases.</p>
          </div>
        </div>
      )
    },
    contact: {
      title: 'Contact Us',
      content: (
        <div>
          <p className="mb-4">We'd love to hear from you. Reach out to us at:</p>
          <p className="mb-2"><strong>Email:</strong> moviehouse@example.com</p>
          <p className="mb-2"><strong>Phone:</strong> (555) 123-4567</p>
          <p><strong>Address:</strong> 123 Cinema Street, Movie Town</p>
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      content: (
        <div>
          <p className="mb-4">At Movie House, we take your privacy seriously.</p>
          <h3 className="font-bold mb-2">Data Collection</h3>
          <p className="mb-4">We collect only the information necessary to provide you with the best movie browsing experience.</p>
          <h3 className="font-bold mb-2">How We Use Your Information</h3>
          <p className="mb-4">Your data is used to personalize your experience and improve our services.</p>
          <h3 className="font-bold mb-2">Your Rights</h3>
          <p>You have the right to access, correct, or delete your personal information at any time.</p>
        </div>
      )
    }
  };

  // Get content or display not found message
  const currentContent = helpContent[section] || {
    title: 'Section Not Found',
    content: <p>Sorry, this help section doesn't exist. <Link href="/help" className="text-blue-600 hover:underline">Return to Help Center</Link></p>
  };

  return (
    <Layout>
      <h1 className="text-3xl mb-6">{currentContent.title}</h1>
      {currentContent.content}
      
      {/* Back to Help Center link if not on the main help page */}
      {section !== 'index' && (
        <div className="mt-8">
          <Link href="/help" className="text-blue-600 hover:underline">← Back to Help Center</Link>
        </div>
      )}
    </Layout>
  );
}