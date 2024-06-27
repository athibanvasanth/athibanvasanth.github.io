import MarkdownIt from 'markdown-it';
import { contentfulClient } from 'src/lib/contentful.ts';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
const md = new MarkdownIt({ html: true });

const fetchEntries = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'duplexComponent',
    });
    console.log(response.items?.[0]?.fields);
    return response.items?.[0]?.fields;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return { title: '', description: '' };
  }
};

const block = await fetchEntries();

export default function GlobalFeature() {
  return (
    <>
      <section className='feature pt-sm-10 pt-5 pb-4'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <div className='feature-item-banner mb-sm-8 mb-lg-10 mb-xxl-15 mb-7'>
                <div className='card-image'>
                  <img
                    src={block?.image?.fields?.file?.url}
                    alt={block.imageAltText}
                    loading='lazy'
                  />
                </div>
                <div className='effect-one'></div>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='feature-item-content mb-xl-15 mb-md-10 mb-7 ps-xxl-8 ps-0'>
                <h2>{block.headline}</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: documentToHtmlString(block.bodyText),
                  }}
                />
                <div className='Learn-more'>
                  {block && (
                    <a href={block.targetPage}>
                      {block.ctaText}
                      <i className='ph-arrow-right'></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='feature pt-sm-10 pt-5 pb-4'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <div className='feature-item-content mb-xl-15 mb-md-10 mb-7 ps-xxl-8 ps-0'>
                <h2>{block.headline2}</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: documentToHtmlString(block.bodyText2),
                  }}
                />
                <div className='Learn-more'>
                  {block && (
                    <a href={block.targetPage2}>
                      {block.ctaText2}
                      <i className='ph-arrow-right'></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='feature-item-banner mb-sm-8 mb-lg-10 mb-xxl-15 mb-7'>
                <div className='card-image'>
                  <img
                    src={block?.image2?.fields?.file?.url}
                    alt={block.imageAltText2}
                    loading='lazy'
                  />
                </div>
                <div className='effect-one'></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='feature pt-sm-10 pt-5 pb-4'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <div className='feature-item-banner mb-sm-8 mb-lg-10 mb-xxl-15 mb-7'>
                <div className='card-image'>
                  <img
                    src={block?.image3?.fields?.file?.url}
                    alt={block.imageAltText3}
                    loading='lazy'
                  />
                </div>
                <div className='effect-one'></div>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='feature-item-content mb-xl-15 mb-md-10 mb-7 ps-xxl-8 ps-0'>
                <h2>{block.headline3}</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: documentToHtmlString(block.bodyText3),
                  }}
                />
                <div className='Learn-more'>
                  {block && (
                    <a href={block.targetPage3}>
                      {block.ctaText3}
                      <i className='ph-arrow-right'></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
