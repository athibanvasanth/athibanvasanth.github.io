import MarkdownIt from 'markdown-it';
import { contentfulClient } from 'src/lib/contentful.ts';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
const md = new MarkdownIt({ html: true });

const fetchEntries = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'aboutHeroComponent',
    });
    console.log(response.items?.[0]?.fields);
    return response.items?.[0]?.fields;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return { title: '', description: '' };
  }
};

const block = await fetchEntries();

export default function AboutHero() {
  const renderPlacer = (param) => {
    switch (param) {
      case 'front_bottom':
        return 'image-one';
      case 'back_top_right':
        return 'image-two';
      case 'back_top_left':
        return 'image-three';
      default:
        return '';
    }
  };

  return (
    <section className='about-hero-two'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-5 col-lg-10 mx-auto'>
            <div className='about-hero-two-content position-relative'>
              <h2>{block.headline}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(block.bodyText),
                }}
              />
              <div className='scroll-down d-flex justify-content-center justify-content-xl-start'>
                {block && (
                  <a href={block.targetPage} className='btn btn-primary btn-lg'>
                    {' '}
                    {block.ctaText}{' '}
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className='col-xl-7 col-lg-12'>
            <div className='about-hero-two-banner'>
              <div className='image-one'>
                <img
                  src={block.image.fields.file.url}
                  alt={block.imageAltText}
                  loading='lazy'
                />
              </div>
              <div className='image-two'>
                <img
                  src={block.image2.fields.file.url}
                  alt={block.imageAltText2}
                  loading='lazy'
                />
              </div>
              <div className='image-three'>
                <img
                  src={block.image3.fields.file.url}
                  alt={block.imageAltText3}
                  loading='lazy'
                />
              </div>

              <div className='pattern'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
