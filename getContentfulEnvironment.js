const contentfulManagement = require('contentful-management');

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: 'CFPAT-Bw6rfzT-zllUvPHYC0hVHco6Iof-v3VQkST2bKdRq9Y',
  });

  return contentfulClient
    .getSpace('kg6h2sq6vy4k')
    .then(space => space.getEnvironment('master'));
};
