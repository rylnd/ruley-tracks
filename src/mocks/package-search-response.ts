export const packageSearchResponseMock = {
  name: 'security_detection_engine',
  title: 'Prebuilt Security Detection Rules',
  version: '8.13.1',
  release: 'ga',
  source: {
    license: 'Elastic-2.0',
  },
  description: 'Prebuilt detection rules for Elastic Security',
  type: 'integration',
  download: '/epr/security_detection_engine/security_detection_engine-8.13.1.zip',
  path: '/package/security_detection_engine/8.13.1',
  icons: [
    {
      src: '/img/security-logo-color-64px.svg',
      path: '/package/security_detection_engine/8.13.1/img/security-logo-color-64px.svg',
      size: '16x16',
      type: 'image/svg+xml',
    },
  ],
  conditions: {
    kibana: {
      version: '^8.13.0',
    },
    elastic: {
      subscription: 'basic',
    },
  },
  owner: {
    type: 'elastic',
    github: 'elastic/protections',
  },
  categories: ['security'],
  signature_path: '/epr/security_detection_engine/security_detection_engine-8.13.1.zip.sig',
};

export const buildPackageSearchResponseMock = () => ({ ...packageSearchResponseMock });
