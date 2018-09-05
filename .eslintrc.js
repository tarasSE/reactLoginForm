module.exports = {
    "parser": "babel-eslint",
    "env": {
        "jasmine": true,
        "browser": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "settings": {
        "react": {
            "pragma": "React",
            "version": "16.0",
        },
        "propWrapperFunctions": [ "forbidExtraProps" ]
    },
    "rules": {
        "no-unused-vars": 1,
        "no-undef": 1,
        "no-console": 1
    }
};