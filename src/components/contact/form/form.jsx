import { contentfulClient } from 'src/lib/contentful.ts';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const fetchEntries = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'contactFormComponent',
    });
    console.log(response.items?.[0]?.fields);
    return response.items?.[0]?.fields;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return { title: '', description: '' };
  }
};

const block = await fetchEntries();

export default function ContactForm() {
  return (
    <section className='contact'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-5 me-auto order-2 order-lg-1'>
            <div className='contact-form-Information'>
              <div className='address'>
                {block && (
                  <>
                    <h3>{block.addressHeading}</h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: documentToHtmlString(block.address),
                      }}
                    ></p>
                  </>
                )}
                <div className='item mb-4'>
                  {block && (
                    <>
                      <h3>{block.phoneHeading}</h3>
                      <a href={`tel:${block.phoneNumber}`}>
                        {block.phoneNumber}
                        <span>
                          <img
                            src={block.phoneIcon.fields.file.url}
                            alt={block.phoneIconAltText}
                            loading='lazy'
                          />
                        </span>
                      </a>
                    </>
                  )}
                </div>
                <div className='item'>
                  {block && (
                    <>
                      <h3>{block.emailHeading}</h3>
                      <a href={`mailto:${block.emailAddress}`}>
                        {block.emailAddress}
                        <span>
                          <img
                            src={block.emailIcon.fields.file.url}
                            alt={block.emailIconAltText}
                            loading='lazy'
                          />
                        </span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6 order-1 order-lg-2'>
            <div className='contact-form'>
              {block && (
                <>
                  <form method='post'>
                    <h3>{block.formTitle}</h3>
                    {block && (
                      <>
                        <div className='col-md-12'>
                          <label htmlFor='Name' className='label'>
                            {block.formFieldName1}
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='Name'
                            name='name'
                            placeholder={block.formFieldPlaceholder1}
                            required=''
                          />
                        </div>
                      </>
                    )}
                    {block && (
                      <>
                        <div className='col-md-12'>
                          <label htmlFor='phone-number' className='label'>
                            {block.formFieldName2}
                          </label>
                          <input
                            type='tel'
                            className='form-control'
                            id='phone-number'
                            name='phone-number'
                            placeholder={block.formFieldPlaceholder2}
                            required=''
                          />
                        </div>
                      </>
                    )}
                    {block && (
                      <>
                        <div className='col-md-12'>
                          <label htmlFor='email' className='label'>
                            {block.formFieldName3}
                          </label>
                          <input
                            type='email'
                            className='form-control mb-6'
                            id='email'
                            name='_replyto'
                            placeholder={block.formFieldPlaceholder3}
                            required=''
                          />
                        </div>
                      </>
                    )}
                    {block && (
                      <>
                        <div className='col-md-12'>
                          <label htmlFor='message' className='label'>
                            {block.formFieldName4}
                          </label>
                          <textarea
                            className='form-control mb-4'
                            id='floatingTextarea2'
                            name='message'
                            placeholder={block.formFieldPlaceholder4}
                            rows='8'
                            spellCheck='false'
                          />
                        </div>
                      </>
                    )}
                    <input
                      type='text'
                      name='_gotcha'
                      style={{ display: 'none' }}
                    />

                    {block && (
                      <div className='col-12'>
                        <button
                          type='submit'
                          className='btn btn-primary btn-lg mt-7'
                        >
                          <span className='position-relative'>
                            {block.formSubmitButtonText}
                          </span>
                        </button>
                      </div>
                    )}
                  </form>
                </>
              )}
              <div className='effect'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
