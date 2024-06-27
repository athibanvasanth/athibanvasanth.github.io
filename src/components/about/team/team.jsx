import { contentfulClient } from 'src/lib/contentful.ts';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const fetchEntries = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'leadershipComponent',
    });
    console.log(response.items?.[0]?.fields);
    return response.items?.[0]?.fields;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return { title: '', description: '' };
  }
};

const block = await fetchEntries();

export default function AboutTeam() {
  return (
    <div className='team'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-10 col-xl-7 mx-auto'>
            <div className='section-header'>
              <h2>{block.title}</h2>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-3 col-md-6'>
            <div className='team-member'>
              <div className='team-member-thumb rounded-box'>
                <img
                  src={block.leader1Image.fields.file.url}
                  alt={block.leader1ImageAltText}
                  loading='lazy'
                />
              </div>
              <div className='team-member-details'>
                <h3>{block.leader1Name}</h3>
                <p>{block.leader1Designation}</p>
              </div>
            </div>
          </div>

          <div className='col-lg-3 col-md-6'>
            <div className='team-member'>
              <div className='team-member-thumb rounded-box'>
                <img
                  src={block.leader2Image.fields.file.url}
                  alt={block.leader2ImageAltText}
                  loading='lazy'
                />
              </div>
              <div className='team-member-details'>
                <h3>{block.leader2Name}</h3>
                <p>{block.leader2Designation}</p>
              </div>
            </div>
          </div>

          <div className='col-lg-3 col-md-6'>
            <div className='team-member'>
              <div className='team-member-thumb rounded-box'>
                <img
                  src={block.leader3Image.fields.file.url}
                  alt={block.leader3ImageAltText}
                  loading='lazy'
                />
              </div>
              <div className='team-member-details'>
                <h3>{block.leader3Name}</h3>
                <p>{block.leader3Designation}</p>
              </div>
            </div>
          </div>

          <div className='col-lg-3 col-md-6'>
            <div className='team-member'>
              <div className='team-member-thumb rounded-box'>
                <img
                  src={block.leader4Image.fields.file.url}
                  alt={block.leader4ImageAltText}
                  loading='lazy'
                />
              </div>
              <div className='team-member-details'>
                <h3>{block.leader4Name}</h3>
                <p>{block.leader4Designation}</p>
              </div>
            </div>
          </div>

          <div className='col-lg-3 col-md-6'>
            <div className='team-member'>
              <div className='team-member-thumb rounded-box'>
                <img
                  src={block.leader5Image.fields.file.url}
                  alt={block.leader5ImageAltText}
                  loading='lazy'
                />
              </div>
              <div className='team-member-details'>
                <h3>{block.leader5Name}</h3>
                <p>{block.leader5Designation}</p>
              </div>
            </div>
          </div>

          <div className='col-lg-3 col-md-6'>
            <div className='team-member'>
              <div className='team-member-thumb rounded-box'>
                <img
                  src={block.leader6Image.fields.file.url}
                  alt={block.leader6ImageAltText}
                  loading='lazy'
                />
              </div>
              <div className='team-member-details'>
                <h3>{block.leader6Name}</h3>
                <p>{block.leader6Designation}</p>
              </div>
            </div>
          </div>

          <div className='col-lg-3 col-md-6'>
            <div className='team-member'>
              <div className='team-member-thumb rounded-box'>
                <img
                  src={block.leader7Image.fields.file.url}
                  alt={block.leader7ImageAltText}
                  loading='lazy'
                />
              </div>
              <div className='team-member-details'>
                <h3>{block.leader7Name}</h3>
                <p>{block.leader7Designation}</p>
              </div>
            </div>
          </div>

          <div className='col-lg-3 col-md-6'>
            <div className='team-member'>
              <div className='team-member-thumb rounded-box'>
                <img
                  src={block.leader8Image.fields.file.url}
                  alt={block.leader8ImageAltText}
                  loading='lazy'
                />
              </div>
              <div className='team-member-details'>
                <h3>{block.leader8Name}</h3>
                <p>{block.leader8Designation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
