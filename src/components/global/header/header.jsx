import MarkdownIt from 'markdown-it';
import { contentfulClient } from 'src/lib/contentful.ts';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
const md = new MarkdownIt({ html: true });

const fetchEntries = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'featuresHeaderComponent',
    });
    console.log(response.items?.[0]?.fields);
    return response.items?.[0]?.fields;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return { title: '', description: '' };
  }
};

const block = await fetchEntries();

export default function GlobalHeader() {
  return (
    <section className='feature pt-0 pb-0'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 mx-auto'>
            <div
              className={`section-header @@disply ${
                block.removeTopPadding ? 'no-top-pad' : ''
              }`}
            >
              <h2>
                {block.title}
                <span>{block.titleSuffix}</span>
              </h2>
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
