import MarkdownIt from 'markdown-it';
import { Scrollspy } from '@makotot/ghostui';
import { contentfulClient } from 'src/lib/contentful.ts';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { useRef } from 'react';
const md = new MarkdownIt({ html: true });

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

export default function PrivacyPrivacy() {
  // Initialize two refs for the two hardcoded sections
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);

  const sectionRefs = [sectionRef1, sectionRef2];

  const handleClick = (event) => {
    Array.from(document.querySelectorAll('.privacy-nav .nav-link')).forEach(
      (element) => {
        element.classList.remove('active');
      }
    );
    event.currentTarget.classList.add('active');
  };

  return (
    <section className='privacy'>
      <div className='container'>
        <div className='row'>
          <Scrollspy sectionRefs={sectionRefs} offset={-90}>
            {({ currentElementIndexInViewport }) => (
              <div className='privacy-wrapper'>
                <div className='col-lg-7 mx-auto'>
                  <div
                    data-bs-spy='scroll'
                    data-bs-target='#navbar-example2'
                    data-bs-offset='0'
                    className='scrollspy-example'
                    tabIndex='0'
                  >
                    {/* First Section */}
                    <div
                      className='privacy-items'
                      id='item1'
                      ref={sectionRefs[0]}
                    >
                      <div className='card'>
                        <h3 className='sub-title'>{block.heading1}</h3>
                        <div className='card-body'>
                          <div
                            className='card-text'
                            dangerouslySetInnerHTML={{
                              __html: documentToHtmlString(block.description1),
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Second Section */}
                    <div
                      className='privacy-items'
                      id='item2'
                      ref={sectionRefs[1]}
                    >
                      <div className='card'>
                        <h3 className='sub-title'>{block.heading2}</h3>
                        <div className='card-body'>
                          <div
                            className='card-text'
                            dangerouslySetInnerHTML={{
                              __html: documentToHtmlString(block.description2),
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-4'>
                  <nav
                    id='scrol-nav'
                    className='navbar navbar-light privacy-nav'
                  >
                    <ul className='nav nav-pills'>
                      {/* Navigation for First Section */}
                      <li className='nav-item'>
                        <a
                          href='#item1'
                          onClick={handleClick}
                          className={`nav-link ${
                            currentElementIndexInViewport === 0 ? 'active' : ''
                          }`}
                        >
                          First Section Heading
                        </a>
                      </li>
                      {/* Navigation for Second Section */}
                      <li className='nav-item'>
                        <a
                          href='#item2'
                          onClick={handleClick}
                          className={`nav-link ${
                            currentElementIndexInViewport === 1 ? 'active' : ''
                          }`}
                        >
                          Second Section Heading
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </Scrollspy>
        </div>
      </div>
    </section>
  );
}
