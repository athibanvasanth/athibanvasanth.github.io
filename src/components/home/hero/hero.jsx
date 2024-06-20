import MarkdownIt from 'markdown-it';
import { contentfulClient } from 'src/lib/contentful.ts';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
const md = new MarkdownIt({ html: true });

const fetchEntries = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'homepageHeroBannerComponent',
    });
    console.log(response.items?.[0]?.fields);
    return response.items?.[0]?.fields;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return { title: '', description: '' };
  }
};

const block = await fetchEntries();

export default function HomeHero() {
  return (
    <section className='hero-two'>
      <div className='hero-two-shape'></div>
      <div className='container-fluid'>
        <div className='row align-items-center'>
          <div className='col-lg-6'>
            <div className='hero-two-content'>
              <h1 className='mb-4'>{block.headline}</h1>
              <div
                className='mb-7 w-xxl-80'
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(block.bodyText),
                }}
              />
              <div className=''>
                {block && (
                  <a href={block.targetPage} className='btn btn-primary btn-lg'>
                    {' '}
                    {block.ctaText}{' '}
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='hero-two-banner'>
              <img
                src={block?.image?.fields?.file?.url}
                alt={block.imageAltText}
              />
              <div className='hero-two-banner-shape'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
