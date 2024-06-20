import bookshop from '@bookshop/astro-bookshop';
import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://top-quail.cloudvent.net/",
  integrations: [bookshop(),  react({
    include: ['**/react/*'],
  }),]
});
