import MarkdownIt from 'markdown-it';
import { contentfulClient } from 'src/lib/contentful.ts';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
const md = new MarkdownIt({ html: true });

const fetchEntries = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'counterComponent',
    });
    console.log(response.items?.[0]?.fields);
    return response.items?.[0]?.fields;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return { title: '', description: '' };
  }
};

const block = await fetchEntries();

export default function GlobalCounter() {
  return (
    <section
      className={`counter-up ${
        block.alternate_style ? 'counter-up-two pb-xxl-14 pb-lg-13' : ''
      }`}
      id='counter-up'
    >
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='section-header'>
              <h2>
                {block.title} <span>{block.titleSuffix}</span>
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(block.description),
                }}
              />
            </div>
          </div>
          <div className='col-12'>
            <div className='counter-up-wrapper d-grid'>
              {/* {block.numbers.map((number, i) => (
                <div className="counter-up-content" key={i}>
                  <div className="counter-up-content-item">
                    <div className="counter-percent">
                      {number.prefix && (
                        <span className="percent">{number.prefix}</span>
                      )}

                      <span className="counter">{number.number}</span>

                      {number.suffix && (
                        <span className="percent">{number.suffix}</span>
                      )}
                    </div>
                    <p>{number.text}</p>
                  </div>
                </div>
              ))} */}

              <div className='counter-up-content'>
                <div className='counter-up-content-item'>
                  <div className='counter-percent'>
                    {block && (
                      <span className='percent'>{block.numberPrefix1}</span>
                    )}

                    <span className='counter'>{block.number}</span>

                    {block && (
                      <span className='percent'>{block.numberSuffix1}</span>
                    )}
                  </div>
                  <p>{block.numberText}</p>
                </div>
              </div>

              <div className='counter-up-content'>
                <div className='counter-up-content-item'>
                  <div className='counter-percent'>
                    {block && (
                      <span className='percent'>{block.numberPrefix2}</span>
                    )}

                    <span className='counter'>{block.number2}</span>

                    {block.number2.suffix && (
                      <span className='percent'>{block.numberSuffix2}</span>
                    )}
                  </div>
                  <p>{block.numberText2}</p>
                </div>
              </div>

              <div className='counter-up-content'>
                <div className='counter-up-content-item'>
                  <div className='counter-percent'>
                    {block && (
                      <span className='percent'>{block.numberPrefix3}</span>
                    )}

                    <span className='counter'>{block.number3}</span>

                    {block.number3.suffix && (
                      <span className='percent'>{block.numberSuffix3}</span>
                    )}
                  </div>
                  <p>{block.numberText3}</p>
                </div>
              </div>

              <div className='counter-up-content'>
                <div className='counter-up-content-item'>
                  <div className='counter-percent'>
                    {block && (
                      <span className='percent'>{block.numberPrefix4}</span>
                    )}

                    <span className='counter'>{block.number4}</span>

                    {block.number2.suffix && (
                      <span className='percent'>{block.numberSuffix4}</span>
                    )}
                  </div>
                  <p>{block.numberText4}</p>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
