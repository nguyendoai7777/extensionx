import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Metadata } from './metadata.types';
import { TemplateString } from './metadata-common.types';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  setMetadata(metadata: Metadata) {
    // 1. Basic Metadata
    if (metadata.title) {
      this.setTitle(metadata.title);
    }

    if (metadata.description) {
      this.meta.updateTag({ name: 'description', content: metadata.description });
    }

    if (metadata.applicationName) {
      this.meta.updateTag({ name: 'application-name', content: metadata.applicationName });
    }

    if (metadata.authors) {
      const authors = Array.isArray(metadata.authors) ? metadata.authors : [metadata.authors];
      authors.forEach((author) => {
        if (author.name) {
          this.meta.updateTag({ name: 'author', content: author.name });
        }
      });
    }

    if (metadata.generator) {
      this.meta.updateTag({ name: 'generator', content: metadata.generator });
    }

    if (metadata.keywords) {
      const keywords = Array.isArray(metadata.keywords)
        ? metadata.keywords.join(', ')
        : metadata.keywords;
      this.meta.updateTag({ name: 'keywords', content: keywords });
    }

    if (metadata.referrer) {
      this.meta.updateTag({ name: 'referrer', content: metadata.referrer });
    }

    if (metadata.themeColor) {
      // Handle simple string or array of descriptors. For simplicity, taking the first if array or string.
      // A more robust impl would handle media queries for multiple theme-colors.
      const color = Array.isArray(metadata.themeColor)
        ? metadata.themeColor[0].color
        : typeof metadata.themeColor === 'string'
        ? metadata.themeColor
        : metadata.themeColor?.color;

      if (color) {
        this.meta.updateTag({ name: 'theme-color', content: color });
      }
    }

    if (metadata.colorScheme) {
      this.meta.updateTag({ name: 'color-scheme', content: metadata.colorScheme });
    }

    if (metadata.viewport) {
      // Viewport is usually set in index.html, but can be overridden here if needed.
      // Handling object vs string
      const viewportContent =
        typeof metadata.viewport === 'string'
          ? metadata.viewport
          : Object.entries(metadata.viewport || {})
              .map(
                ([key, value]) => `${key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}=${value}`
              )
              .join(', ');

      if (viewportContent) {
        this.meta.updateTag({ name: 'viewport', content: viewportContent });
      }
    }

    if (metadata.creator) {
      this.meta.updateTag({ name: 'creator', content: metadata.creator });
    }

    if (metadata.publisher) {
      this.meta.updateTag({ name: 'publisher', content: metadata.publisher });
    }

    if (metadata.robots) {
      const robotsContent =
        typeof metadata.robots === 'string'
          ? metadata.robots
          : Object.entries(metadata.robots)
              .map(([key, value]) => {
                if (typeof value === 'boolean') return value ? key : `no${key}`;
                return `${key}:${value}`;
              })
              .join(', ');
      this.meta.updateTag({ name: 'robots', content: robotsContent });
    }

    // 2. Open Graph
    if (metadata.openGraph) {
      this.setOpenGraph(metadata.openGraph);
    }

    // 3. Twitter
    if (metadata.twitter) {
      this.setTwitter(metadata.twitter);
    }
  }

  private setTitle(title: string | TemplateString | null | undefined) {
    if (!title) return;
    const titleString =
      typeof title === 'string'
        ? title
        : 'default' in title
        ? title.default
        : 'absolute' in title
        ? title.absolute
        : '';

    if (titleString) {
      this.title.setTitle(titleString);
      this.meta.updateTag({ property: 'og:title', content: titleString });
      this.meta.updateTag({ name: 'twitter:title', content: titleString });
    }
  }

  private setOpenGraph(og: any) {
    if (og.title) {
      const title = typeof og.title === 'string' ? og.title : og.title.default || og.title.absolute;
      this.meta.updateTag({ property: 'og:title', content: title });
    }
    if (og.description) {
      this.meta.updateTag({ property: 'og:description', content: og.description });
    }
    if (og.url) {
      this.meta.updateTag({ property: 'og:url', content: og.url.toString() });
    }
    if (og.siteName) {
      this.meta.updateTag({ property: 'og:site_name', content: og.siteName });
    }
    if (og.locale) {
      this.meta.updateTag({ property: 'og:locale', content: og.locale });
    }
    if (og.type) {
      this.meta.updateTag({ property: 'og:type', content: og.type });
    }

    // Handle images
    if (og.images) {
      const images = Array.isArray(og.images) ? og.images : [og.images];
      images.forEach((img: any) => {
        const url = typeof img === 'string' ? img : img.url;
        this.meta.updateTag({ property: 'og:image', content: url.toString() });

        if (typeof img === 'object') {
          if (img.width)
            this.meta.updateTag({ property: 'og:image:width', content: img.width.toString() });
          if (img.height)
            this.meta.updateTag({ property: 'og:image:height', content: img.height.toString() });
          if (img.alt) this.meta.updateTag({ property: 'og:image:alt', content: img.alt });
          if (img.type) this.meta.updateTag({ property: 'og:image:type', content: img.type });
        }
      });
    }
  }

  private setTwitter(twitter: any) {
    if (twitter.card) {
      this.meta.updateTag({ name: 'twitter:card', content: twitter.card });
    }
    if (twitter.site) {
      this.meta.updateTag({ name: 'twitter:site', content: twitter.site });
    }
    if (twitter.creator) {
      this.meta.updateTag({ name: 'twitter:creator', content: twitter.creator });
    }
    if (twitter.description) {
      this.meta.updateTag({ name: 'twitter:description', content: twitter.description });
    }
    if (twitter.title) {
      const title =
        typeof twitter.title === 'string'
          ? twitter.title
          : twitter.title.default || twitter.title.absolute;
      this.meta.updateTag({ name: 'twitter:title', content: title });
    }

    if (twitter.images) {
      const images = Array.isArray(twitter.images) ? twitter.images : [twitter.images];
      // Twitter usually only takes the first image or specific card types
      const img = images[0];
      const url = typeof img === 'string' ? img : img.url;
      this.meta.updateTag({ name: 'twitter:image', content: url.toString() });

      if (typeof img === 'object' && img.alt) {
        this.meta.updateTag({ name: 'twitter:image:alt', content: img.alt });
      }
    }
  }
}
