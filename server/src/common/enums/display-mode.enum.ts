// Where an external content item is allowed to surface. A published item can
// carry more than one mode at once (e.g. both the content feed and the
// gallery) without duplicating the underlying record. "Hidden" is modeled by
// the item's `published` flag rather than a mode, so it can't be combined
// with the others by mistake.
export enum DisplayMode {
  SOCIAL_POST = 'SOCIAL_POST',
  GALLERY = 'GALLERY',
  FEATURED = 'FEATURED',
}
