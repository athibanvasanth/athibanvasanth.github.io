import MarkdownIt from 'markdown-it';
import { contentfulClient } from 'src/lib/contentful.ts';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
const md = new MarkdownIt({ html: true });

const fetchEntries = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'videoAboutComponent',
    });
    console.log(response.items?.[0]?.fields);
    return response.items?.[0]?.fields;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return { title: '', description: '' };
  }
};

const block = await fetchEntries();

export default function AboutVideo() {
  return (
    <section className='works'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-6'>
            <div className='works-content'>
              <h2>{block.title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(block.description),
                }}
              />
              {block && (
                <a href={block.buttonUrl} className='btn btn-lg btn-white'>
                  {' '}
                  {block.buttonText}{' '}
                </a>
              )}
            </div>
          </div>
          <div className='col-lg-6'>
            {block && (
              <div className='works-banner'>
                <img
                  src={block.image.fields.file.url}
                  className='w-100'
                  alt={block.imageAltText}
                  loading='lazy'
                  style={{ borderRadius: '20px' }}
                />
                <div className='effect'></div>
                <div className='video-iframe d-flex align-items-center justify-content-center'>
                  <div className='video-icon me-sm-9 me-8'>
                    <a className='popup-vimeo' href={block.videoUrl}>
                      <svg
                        width='28'
                        height='32'
                        viewBox='0 0 28 32'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M26 12.5359C28.6667 14.0755 28.6667 17.9245 26 19.4641L6.5 30.7224C3.83333 32.262 0.499998 30.3375 0.499999 27.2583L0.5 4.74167C0.5 1.66247 3.83333 -0.262033 6.5 1.27757L26 12.5359Z'
                          fill='white'
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
