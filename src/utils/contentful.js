import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export const getProjects = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'project',
      order: 'fields.order',
    });
    return response.items.map(item => ({
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.description,
      link: item.fields.link,
      imgNormal: item.fields.image?.fields?.file?.url || '',
      imgWide: item.fields.imageWide?.fields?.file?.url || '',
      alt: item.fields.alt || item.fields.title,
      order: item.fields.order || 0,
      active: item.fields.active !== false, // Default to true if not specified
      icon: item.fields.icon || null,
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const getBlogPosts = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      order: '-fields.publishDate',
    });
    return response.items.map(item => ({
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.description,
      content: item.fields.content,
      link: item.fields.link,
      image: item.fields.image?.fields?.file?.url || '',
      publishDate: item.fields.publishDate,
      featured: item.fields.featured || false,
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const getFeaturedPost = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.featured': true,
      limit: 1,
    });
    if (response.items.length > 0) {
      const item = response.items[0];
      return {
        id: item.sys.id,
        title: item.fields.title,
        description: item.fields.description,
        content: item.fields.content,
        link: item.fields.link,
        image: item.fields.image?.fields?.file?.url || '',
        publishDate: item.fields.publishDate,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching featured post:', error);
    return null;
  }
};

export const getProfile = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'profile',
      limit: 1,
    });
    if (response.items.length > 0) {
      const item = response.items[0];
      return {
        id: item.sys.id,
        name: item.fields.name,
        title: item.fields.title,
        location: item.fields.location,
        bio: item.fields.bio,
        profileImage: item.fields.profileImage?.fields?.file?.url || '',
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const getSettings = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'settings',
      limit: 1,
    });
    if (response.items.length > 0) {
      const item = response.items[0];
      return {
        id: item.sys.id,
        blogArchiveUrl: item.fields.blogArchiveUrl,
        socialLinks: item.fields.socialLinks || {},
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
};

export const getSocialLinks = async () => {
  try {
    const settings = await getSettings();
    if (settings && settings.socialLinks) {
      // Convert settings JSON object to array format
      const linksArray = Object.entries(settings.socialLinks).map(
        ([key, link], index) => ({
          id: key,
          name: link.label || key,
          url: link.url,
          icon: link.icon || 'FaExternalLinkAlt',
          order: link.order || index,
          active: link.active !== false,
          disabled: false,
        })
      );

      return linksArray.sort((a, b) => a.order - b.order);
    }
  } catch (error) {
    console.error('Error fetching social links from settings:', error);
  }

  return [];
};

export const getYouTubeVideo = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'youtubeVideo',
      limit: 1,
    });
    if (response.items.length > 0) {
      const item = response.items[0];
      return {
        id: item.sys.id,
        title: item.fields.title,
        description: item.fields.description,
        url: item.fields.url,
        thumbnail: item.fields.thumbnail?.fields?.file?.url || '',
        duration: item.fields.duration,
        publishDate: item.fields.publishDate,
        active: item.fields.active !== false,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching YouTube video:', error);
    return null;
  }
};
