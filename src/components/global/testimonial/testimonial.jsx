import MarkdownIt from 'markdown-it';
import { contentfulClient } from 'src/lib/contentful.ts';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
const md = new MarkdownIt({ html: true });

const fetchEntries = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'testimonialComponent',
    });
    console.log(response.items?.[0]?.fields);
    return response.items?.[0]?.fields;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return { title: '', description: '' };
  }
};

const block = await fetchEntries();

export default function GlobalTestimonial() {
  return (
    <section className='testimonial'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-8 mx-auto text-center mb-5'>
            <div className='testimonial-content'>
              <h2>
                {block.title}
                <span>{block.titleSuffix}</span>
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(block.description),
                }}
              ></p>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-4 col-md-6 mb-5'>
            <div className='testimonial-item'>
              <div className='testimonial-item-person'>
                <div className='thumb'>
                  <img
                    src={block?.image1?.fields?.file?.url}
                    alt={block.authorAltText1}
                    className='client-image'
                    loading='lazy'
                  />
                </div>
                <div className='content'>
                  <h3>{block.authorName1}</h3>
                  <p>{block.authorDesignation1}</p>
                </div>
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(block.authorMessage1),
                }}
              ></p>
            </div>
          </div>

          <div className='col-lg-4 col-md-6 mb-5'>
            <div className='testimonial-item'>
              <div className='testimonial-item-person'>
                <div className='thumb'>
                  <img
                    src={block?.image2?.fields?.file?.url}
                    alt={block.authorAltText2}
                    className='client-image'
                    loading='lazy'
                  />
                </div>
                <div className='content'>
                  <h3>{block.authorName2}</h3>
                  <p>{block.authorDesignation2}</p>
                </div>
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(block.authorMessage2),
                }}
              ></p>
            </div>
          </div>

          <div className='col-lg-4 col-md-6 mb-5'>
            <div className='testimonial-item'>
              <div className='testimonial-item-person'>
                <div className='thumb'>
                  <img
                    src={block?.image3?.fields?.file?.url}
                    alt={block.authorAltText3}
                    className='client-image'
                    loading='lazy'
                  />
                </div>
                <div className='content'>
                  <h3>{block.authorName3}</h3>
                  <p>{block.authorDesignation3}</p>
                </div>
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(block.authorMessage3),
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
