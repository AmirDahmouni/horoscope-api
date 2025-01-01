module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  forceExit: true,
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
