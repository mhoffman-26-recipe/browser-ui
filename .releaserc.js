module.exports = {
    branches: ['develop'],
    plugins: [
        ['@semantic-release/commit-analyzer', {
            preset: 'angular',
            releaseRules: [
                { type: 'docs', release: 'patch' },
                { type: 'refactor', release: 'patch' },
                { type: 'style', release: 'patch' },
                { type: 'chore', release: 'patch' },
                { scope: 'no-release', release: false },
            ]
        }],
        ['@semantic-release/release-notes-generator', {
            preset: 'angular',
            writerOpts: {
                headerIds: false,
                mangle: false
            }
        }],
        '@semantic-release/changelog',
        '@semantic-release/github',
        [
            "@semantic-release/npm",
            {
                "npmPublish": false
            }
        ],
        '@semantic-release/git'
    ]
} 