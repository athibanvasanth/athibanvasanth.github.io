import { contentfulClient } from 'src/lib/contentful.ts';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const fetchEntries = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'privacyPolicyComponent',
    });
    console.log(response.items?.[0]?.fields);
    return response.items?.[0]?.fields;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return { title: '', description: '' };
  }
};

const block = await fetchEntries();

export default function PrivacyHero() {
  return (
    <section className='privacy-hero'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='privacy-hero-content text-center'>
              <h1>{block.title}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
