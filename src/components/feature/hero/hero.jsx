import MarkdownIt from 'markdown-it';
import { contentfulClient } from 'src/lib/contentful.ts';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
const md = new MarkdownIt({ html: true });

const fetchEntries = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'heroBannerComponent',
    });
    console.log(response.items?.[0]?.fields);
    return response.items?.[0]?.fields;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return { title: '', description: '' };
  }
};

const block = await fetchEntries();

export default function FeatureHero() {
  return (
    <section className='feature-hero'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-6'>
            <div className='feature-hero-content'>
              <h1 className=''>{block.headline}</h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(block.bodyText),
                }}
              />
              <div className='d-block mb-6'>
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
            <div className='feature-hero-banner'>
              <img
                src={block?.image?.fields?.file?.url}
                alt={block.imageAltText}
                loading='lazy'
              />
              <div className='shape'>
                <img
                  src='/images/feature/effect-4.png'
                  alt='shape'
                  loading='lazy'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
