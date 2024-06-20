import MarkdownIt from 'markdown-it';
import { contentfulClient } from 'src/lib/contentful.ts';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const md = new MarkdownIt({ html: true });

const fetchEntries = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'contactHeroComponent',
    });
    console.log(response.items?.[0]?.fields);
    return response.items?.[0]?.fields;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return { title: '', description: '' };
  }
};

const block = await fetchEntries();

export default function ContactHero() {
  return (
    <section className='contact-hero'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='contact-hero-content'>
              <h1>{block.title}</h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(block.description),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
