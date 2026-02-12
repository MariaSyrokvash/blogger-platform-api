export const blogsTestData = {
  // ===========================================================================
  // POSITIVE DATA
  // ===========================================================================
  valid: {
    name: 'Test Blog',
    description: 'A valid blog description that is long enough',
    websiteUrl: 'https://test-url.com'
  },

  // ===========================================================================
  // INVALID DATA (Boundary values)
  // ===========================================================================
  invalid: {
    // NAME field cases
    name: {
      empty: { name: '', description: 'valid desc', websiteUrl: 'https://valid.com' },
      tooLong: { name: 'a'.repeat(16), description: 'valid desc', websiteUrl: 'https://valid.com' },
      notString: { name: 123, description: 'valid desc', websiteUrl: 'https://valid.com' },
    },

    // DESCRIPTION field cases
    description: {
      empty: { name: 'Valid name', description: '', websiteUrl: 'https://valid.com' },
      tooLong: { name: 'Valid name', description: 'a'.repeat(501), websiteUrl: 'https://valid.com' },
    },

    // WEBSITE_URL field cases
    websiteUrl: {
      empty: { name: 'Valid name', description: 'valid desc', websiteUrl: '' },
      tooLong: { name: 'Valid name', description: 'valid desc', websiteUrl: 'https://' + 'a'.repeat(101) + '.com' },
      wrongPattern: { name: 'Valid name', description: 'valid desc', websiteUrl: 'ftp://wrong-protocol.com' },
    }
  }
};

export const postsTestData = {
  // ===========================================================================
  // POSITIVE DATA
  // ===========================================================================
  valid: (blogId: string) => ({
    title: 'Post Title',
    shortDescription: 'Short description for the post',
    content: 'Main content of the post',
    blogId: blogId
  }),

  // ===========================================================================
  // INVALID DATA
  // ===========================================================================
  invalid: {
    title: {
      tooLong: (blogId: string) => ({
        title: 'a'.repeat(31), // Limit is usually 30
        shortDescription: 'valid',
        content: 'valid',
        blogId
      }),
    },
    blogId: {
      notExist: {
        title: 'Title',
        shortDescription: 'Desc',
        content: 'Content',
        blogId: 'non-existent-blog-id'
      }
    }
  }
};
