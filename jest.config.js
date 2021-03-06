module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: [
    '**/test/**/*.test.ts'
  ],
  testEnvironment: 'node',
  globalSetup: './jest.setup.js',
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    'src/.*_grpc_pb.d.ts',
    'src/.*_grpc_pb.js',
    'src/.*_pb.d.ts',
    'src/.*_pb.js'
  ],
  modulePaths: [
    'src'
  ]
};
