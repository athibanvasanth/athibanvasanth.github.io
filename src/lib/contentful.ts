import { createClient } from 'contentful';

const CONTENTFUL_SPACE_ID = '873sr1oq09ql';
const CONTENTFUL_DELIVERY_TOKEN = 'N0OqS74X3UAwI2elrJnShqEF4hH-8TN8j2F1UWiuiOE';
const CONTENTFUL_PREVIEW_TOKEN = 'k9R3-fE5brPxOlWQhYb3RJALjntpQpMfwCfPTMWk3ls';

export const contentfulClient = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_DELIVERY_TOKEN,
});